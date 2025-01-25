import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const start = (page - 1) * limit

  const supabase = createRouteHandlerClient({ cookies })

  // Fetch posts with user information and reply count
  const {
    data: posts,
    error: postsError,
    count,
  } = await supabase
    .from("posts")
    .select(
      `*,
      profiles:user_id (username),
      replies:replies (count)`
    , { count: "exact" })
    .order("created_at", { ascending: false })
    .range(start, start + limit - 1)

  if (postsError) {
    return NextResponse.json({ error: postsError.message }, { status: 500 })
  }

  // Handle 'count' being potentially null
  const totalPosts = count ?? 0  // Use 0 if count is null

  // Fetch all unique tags
  const { data: tags, error: tagsError } = await supabase.from("posts").select("tags")

  if (tagsError) {
    return NextResponse.json({ error: tagsError.message }, { status: 500 })
  }

  const allTags = Array.from(new Set(tags.flatMap((post) => post.tags || [])))

  return NextResponse.json({
    posts,
    tags: allTags,
    totalPosts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
  })
}


export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const requestData = await request.json()

  switch (requestData.type) {
    case "newPost":
      const { data: newPost, error: newPostError } = await supabase
        .from("posts")
        .insert({
          title: requestData.title,
          body: requestData.content,
          user_id: requestData.userId,
          tags: requestData.tags,
          image_url: requestData.imageUrls,
        })
        .select()
        .single()

      if (newPostError) {
        return NextResponse.json({ error: newPostError.message }, { status: 500 })
      }
      return NextResponse.json({ success: true, post: newPost })

    case "deletePost":
      const { error: deletePostError } = await supabase.from("posts").delete().eq("id", requestData.postId)

      if (deletePostError) {
        return NextResponse.json({ error: deletePostError.message }, { status: 500 })
      }
      return NextResponse.json({ success: true })

    case "newReply":
      const { data: newReply, error: newReplyError } = await supabase
        .from("replies")
        .insert({
          body: requestData.message.content,
          user_id: requestData.message.userId,
          post_id: requestData.postId,
        })
        .select()
        .single()

      if (newReplyError) {
        return NextResponse.json({ error: newReplyError.message }, { status: 500 })
      }
      return NextResponse.json({ success: true, reply: newReply })

    case "deleteReply":
      const { error: deleteReplyError } = await supabase.from("replies").delete().eq("id", requestData.replyId)

      if (deleteReplyError) {
        return NextResponse.json({ error: deleteReplyError.message }, { status: 500 })
      }
      return NextResponse.json({ success: true })

    case "toggleLike":
      const { data: post, error: postError } = await supabase
        .from("posts")
        .select("likes")
        .eq("id", requestData.postId)
        .single()

      if (postError) {
        return NextResponse.json({ error: postError.message }, { status: 500 })
      }

      const likes = post.likes || []
      const updatedLikes = requestData.isLiked
        ? likes.filter((id: string) => id !== requestData.userId)
        : [...likes, requestData.userId]

      const { error: updateLikeError } = await supabase
        .from("posts")
        .update({ likes: updatedLikes })
        .eq("id", requestData.postId)

      if (updateLikeError) {
        return NextResponse.json({ error: updateLikeError.message }, { status: 500 })
      }
      return NextResponse.json({ success: true, likes: updatedLikes })

    case "addTag":
      // Tags are stored in the posts table, so we don't need to add them separately
      return NextResponse.json({ success: true })

    case "togglePin":
      const { error: togglePinError } = await supabase
        .from("posts")
        .update({ is_pinned: requestData.isPinned })
        .eq("id", requestData.postId)

      if (togglePinError) {
        return NextResponse.json({ error: togglePinError.message }, { status: 500 })
      }
      return NextResponse.json({ success: true })

    default:
      return NextResponse.json({ success: false, error: "Invalid action type" }, { status: 400 })
  }
}

