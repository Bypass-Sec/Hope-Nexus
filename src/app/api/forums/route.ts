import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

type Message = {
  id: number
  author: string
  content: string
}

type ForumPost = {
  id: number
  title: string
  author: string
  authorAvatar: string
  date: string
  content: string
  tags: string[]
  replies: number
  likes: number
  messages: Message[]
  imageUrls: string[]
  isPinned: boolean
}

type ForumData = {
  forumPosts: ForumPost[]
  allTags: string[]
}

//  function to read the JSON file
async function getForumData(): Promise<ForumData> {
  const filePath = path.join(process.cwd(), 'data', 'forumPosts.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(jsonData)
}

//  function to write to the JSON file
async function saveForumData(data: ForumData): Promise<void> {
  const filePath = path.join(process.cwd(), 'data', 'forumPosts.json')
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const start = (page - 1) * limit
  const end = start + limit

  const data = await getForumData()
  const paginatedPosts = data.forumPosts.slice(start, end)
  
  return NextResponse.json({ 
    posts: paginatedPosts, 
    tags: data.allTags, 
    totalPosts: data.forumPosts.length,
    currentPage: page,
    totalPages: Math.ceil(data.forumPosts.length / limit)
  })
}

export async function POST(request: Request) {
  const requestData = await request.json()
  const data = await getForumData()

  switch (requestData.type) {
    case 'newPost':
      const newPost: ForumPost = {
        id: data.forumPosts.length + 1,
        title: requestData.title,
        author: "Current User",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: new Date().toISOString().split('T')[0],
        content: requestData.content,
        tags: requestData.tags,
        replies: 0,
        likes: 0,
        messages: [],
        imageUrls: requestData.imageUrls || [],
        isPinned: false,
      }
      data.forumPosts.push(newPost)
      await saveForumData(data)
      return NextResponse.json({ success: true, post: newPost })

    case 'deletePost':
      data.forumPosts = data.forumPosts.filter(post => post.id !== requestData.postId)
      await saveForumData(data)
      return NextResponse.json({ success: true })

    case 'newMessage':
      const post = data.forumPosts.find((p: ForumPost) => p.id === requestData.postId)
      if (post) {
        const newMessageId = post.messages.length > 0 ? 
          Math.max(...post.messages.map((m: Message) => m.id)) + 1 : 1
        post.messages.push({ id: newMessageId, ...requestData.message })
        post.replies += 1
        await saveForumData(data)
      }
      return NextResponse.json({ success: true })

    case 'deleteMessage':
      const postToUpdate = data.forumPosts.find((p: ForumPost) => p.id === requestData.postId)
      if (postToUpdate) {
        postToUpdate.messages = postToUpdate.messages.filter((m: Message) => m.id !== requestData.messageId)
        postToUpdate.replies -= 1
        await saveForumData(data)
      }
      return NextResponse.json({ success: true })

    case 'toggleLike':
      const postToLike = data.forumPosts.find((p: ForumPost) => p.id === requestData.postId)
      if (postToLike) {
        postToLike.likes += requestData.isLiked ? -1 : 1
        await saveForumData(data)
      }
      return NextResponse.json({ success: true })

    case 'addTag':
      if (!data.allTags.includes(requestData.tag)) {
        data.allTags.push(requestData.tag)
        await saveForumData(data)
      }
      return NextResponse.json({ success: true, tags: data.allTags })

    case 'togglePin':
      const postToPin = data.forumPosts.find((p: ForumPost) => p.id === requestData.postId)
      if (postToPin) {
        postToPin.isPinned = requestData.isPinned
        await saveForumData(data)
      }
      return NextResponse.json({ success: true })

    default:
      return NextResponse.json({ success: false, error: 'Invalid action type' }, { status: 400 })
  }
}

