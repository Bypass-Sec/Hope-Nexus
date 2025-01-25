"use client"

import { useState, useEffect, useCallback } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ForumCard } from "../../components/Forum/forum-card"
import { ForumHeader } from "../../components/Forum/forum-header"
import { Button } from "../../components/Forum/ui/button"
import { Textarea } from "../../components/Forum/ui/textarea"
import { X, Send } from "lucide-react"
import { ForumCardSkeleton } from "../../components/Forum/forum-card-skeleton"
import { Checkbox } from "../../components/Forum/ui/checkbox"
import Footer from '../../components/Footer'
import { CardFooter } from "@/components/Forum/ui/card"

type ForumPost = {
  id: string
  title: string
  body: string
  created_at: string
  updated_at: string
  image_url: string[]
  tags: string[]
  likes: string[]
  is_pinned: boolean
  user_id: string
  auth_user: { id: string; email: string }
  replies: { count: number }
}


type Reply = {
  id: string
  body: string
  user_id: string
  created_at: string
  user: { displayname: string }
}

export default function ForumsPage() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [allTags, setAllTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [actionInProgress, setActionInProgress] = useState<{
    type: "like" | "delete" | "message"
    id: string
  } | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string } | null>(null)
  const [replies, setReplies] = useState<{ [postId: string]: Reply[] }>({})

  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchCurrentUser(),
    fetchPosts()
  
  }, [])

  const fetchCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      setCurrentUser({ id: user.id, username: user.user_metadata.displayname || "Anonymous" })
    } else {
      setCurrentUser(null)
    }
  }
  const fetchPosts = async () => {
    try {
      const { data, error, count } = await supabase
      .from("posts")
      .select(`
        *,
        
        replies!inner(count)
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      
 
      
      if (error) throw error;
  
      // Assuming the user is in the data, adjust the posts structure if necessary
      const postsWithUsers = data?.map((post: any) => ({
        ...post,
        user: post.auth_user || { displayname: 'Unknown' },  // fallback if no user found
      }));
  
      setPosts(postsWithUsers || []);
      setTotalPages(Math.ceil((count ?? 0) / 10));
  
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  
  

  const fetchReplies = async (postId: string) => {
    const { data, error } = await supabase
      .from("replies")
      .select("*") // Fetch all columns from the replies table
      .eq("post_id", postId) // Filter by post_id
      .order("created_at", { ascending: true }); // Order by created_at
  
    if (error) {
      console.error("Error fetching replies:", error);
    } else {
      setReplies((prev) => ({ ...prev, [postId]: data || [] }));
    }
  };
  

  const filteredPosts = posts.filter(
    (post) =>
      (selectedTags.length === 0 || post.tags.some((tag) => selectedTags.includes(tag))) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleAddMessage = async (postId: string, message: string) => {
    if (!isLoggedIn()) {
      alert("You must be logged in to add a message")
      return
    }

    setActionInProgress({ type: "message", id: postId })

    try {
      const { data, error } = await supabase
        .from("replies")
        .insert({
          body: message,
          user_id: currentUser!.id,
          post_id: postId,
        })
        .select()
        .single()

      if (error) throw error

      setReplies((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), { ...data, user: { displayname: currentUser!.username } }],
      }))

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, replies: { count: (post.replies?.count || 0) + 1 } } : post,
        ),
      )
      setNewMessage("")
    } catch (error) {
      console.error("Error adding message:", error)
    } finally {
      setActionInProgress(null)
    }
  }

  const handleToggleMessages = (postId: string) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null)
    } else {
      setExpandedPostId(postId)
      fetchReplies(postId)
    }
  }

  const handleCreatePost = useCallback(
    async (newPost: { title: string; content: string; tags: string[]; imageUrls: string[] }) => {
      if (!isLoggedIn()) {
        alert("You must be logged in to create a post")
        return
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .insert({
            title: newPost.title,
            body: newPost.content,
            user_id: currentUser!.id,
            tags: newPost.tags,
            image_url: newPost.imageUrls,
            likes: [],
            is_pinned: false,
          })
          .select()
          .single()

        if (error) throw error

        setPosts((prev) => [data, ...prev])
        // fetchPosts() // Removed fetchPosts call from here
      } catch (error) {
        console.error("Error creating post:", error)
      }
    },
    [currentUser, supabase], // Removed fetchPosts from dependencies
  )

  const handleToggleLike = async (postId: string) => {
    if (!isLoggedIn()) {
      alert("You must be logged in to like a post")
      return
    }

    setActionInProgress({ type: "like", id: postId })

    try {
      const post = posts.find((p) => p.id === postId)
      if (!post) return

      const isLiked = post.likes.includes(currentUser!.id)
      const updatedLikes = isLiked
        ? post.likes.filter((id) => id !== currentUser!.id)
        : [...post.likes, currentUser!.id]

      const { error } = await supabase.from("posts").update({ likes: updatedLikes }).eq("id", postId)

      if (error) throw error

      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: updatedLikes } : p)))
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setActionInProgress(null)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!isLoggedIn()) {
      alert("You must be logged in to delete a post")
      return
    }

    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId)

      if (error) throw error

      setPosts((prev) => prev.filter((p) => p.id !== postId))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const handleDeleteMessage = async (postId: string, replyId: string) => {
    if (!isLoggedIn()) {
      alert("You must be logged in to delete a message")
      return
    }

    try {
      const { error } = await supabase.from("replies").delete().eq("id", replyId)

      if (error) throw error

      setReplies((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((reply) => reply.id !== replyId),
      }))

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, replies: { count: (post.replies?.count || 0) - 1 } } : post,
        ),
      )
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  const handleTogglePin = async (postId: string) => {
    if (!isAdmin) {
      alert("You must be an admin to pin a post")
      return
    }

    try {
      const post = posts.find((p) => p.id === postId)
      if (!post) return

      const { error } = await supabase.from("posts").update({ is_pinned: !post.is_pinned }).eq("id", postId)

      if (error) throw error

      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, is_pinned: !p.is_pinned } : p)))
    } catch (error) {
      console.error("Error toggling pin:", error)
    }
  }

  const canManagePost = (postUserId: string) => {
    return isAdmin || (isLoggedIn() && currentUser!.id === postUserId)
  }

  const canManageMessage = (messageUserId: string) => {
    return isAdmin || (isLoggedIn() && currentUser!.id === messageUserId)
  }

  const isLoggedIn = () => !!currentUser

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1
    if (!a.is_pinned && b.is_pinned) return 1
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
  

    return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full h-[40vh] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-950/80 z-1" />
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop"
          alt="Forum Banner"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold z-2 text-white text-center">
          Forums
        </h1>
        <p className="absolute top-[60%] left-1/2 transform -translate-x-1/2 text-xl text-slate-200 text-center mt-4 max-w-2xl">
          Discuss with NGOs and Individuals alike
        </p>
      </div>

      {isLoggedIn() && (
        <div className="fixed bottom-4 right-4 flex items-center space-x-2 bg-white shadow-md p-2 rounded-lg z-40">
          <Checkbox id="admin-mode" checked={isAdmin} onCheckedChange={(checked) => setIsAdmin(checked as boolean)} />
          <label htmlFor="admin-mode" className="text-slate-900 text-sm">
            Admin Mode
          </label>
          
        </div>
      )}

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className={`${expandedPostId ? 'w-2/3 pr-4' : 'w-full'}`}>
          <ForumHeader
            tags={[]} // Assuming you have tags
            selectedTags={[]}
            onTagSelect={handleTagSelect}
            onSearch={handleSearch}
            onCreatePost={handleCreatePost}
            onAddCustomTag={isAdmin ? (tag: string) => {} : undefined}
            isLoggedIn={isLoggedIn()}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.length === 0 ? (
              <p>No posts available</p>
            ) : (
              posts.map((post) => (
                <ForumCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  created_at={post.created_at}
                  tags={post.tags || []}
                  likes={post.likes || []}
                  image_url={post.image_url || []}
                  is_pinned={post.is_pinned}
                  user_id={post.user_id}
                  replies={Array.isArray(post.replies) && post.replies.length > 0 ? post.replies[0] : { count: 0 }}
                  onToggleMessages={handleToggleMessages}
                  onToggleLike={handleToggleLike}
                  onDeletePost={canManagePost(post.user_id) ? handleDeletePost : undefined}
                  onDeleteMessage={handleDeleteMessage}
                  onTogglePin={isAdmin ? handleTogglePin : undefined}
                  isExpanded={post.id === expandedPostId}
                  isLiked={currentUser ? post.likes.includes(currentUser.id) : false}
                  isActionInProgress={false} // Customize based on your logic
                  isPinned={post.is_pinned}
                  currentUser={currentUser?.username || null}
                  canManageMessage={canManageMessage}
                  isLoggedIn={isLoggedIn()}
                />
              ))
            )}
            
          </div>

          {/* Pagination controls */}
          <div className="mt-8 flex justify-center space-x-2">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="self-center">
              {currentPage} of {totalPages}
            </span>
            <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </Button>
           
            
          </div>
        </div>

        {expandedPostId && (
          <div className="w-1/3 bg-white border-l border-slate-200 p-4 fixed top-20 right-0 h-[calc(100vh-5rem)] overflow-y-auto z-30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Messages</h3>
              <Button variant="ghost" size="icon" onClick={() => setExpandedPostId(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4 mb-4">
            {replies[expandedPostId]?.map((reply) => (
  <div key={reply.id} className="border-b pb-2">
    {/* Safety check for reply.user */}
    <p className="font-semibold">{reply.user?.displayname || "Anonymous"}</p>
    <p>{reply.body}</p>
    {canManageMessage(reply.user_id) && (
      <Button variant="ghost" size="sm" onClick={() => handleDeleteMessage(expandedPostId, reply.id)}>
        Delete
      </Button>
                  )}
                </div>
              ))}
            </div>
            {isLoggedIn() && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddMessage(expandedPostId, newMessage);
                }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Add a message..."
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
        
      </div>
      <Footer />
    </div>
  )
}

