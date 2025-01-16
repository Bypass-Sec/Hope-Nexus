'use client'

import { useState, useEffect } from 'react'

import { supabase } from '../lib/supabaseClient'
import PostList from '../../components/(forums)/PostList'
import CreatePostForm from '../../components/(forums)/CreatePostForm'
import TagCloud from '../../components/(forums)/TagCloud'
import Header from '../../components/(forums)/Header'

export default function Forums() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const [loading, setLoading] = useState(true) // For managing loading state


  // Check if the user is logged in and fetch posts when the component is mounted
  useEffect(() => {
    checkUser()
    fetchPosts()
  }, [])

  const checkUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error fetching user:', error)
    } else {
      setUser(data.user)
    }
    setLoading(false)
  }

  const fetchPosts = async () => {
    let query = supabase.from('posts').select('*')
    if (selectedTag) {
      query = query.eq('tags.name', selectedTag)
    }
    const { data, error } = await query
    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      setPosts(data)
    }
  }

  const handleCreatePost = async (newPost) => {
    const { data, error } = await supabase
      .from('posts')
      .insert(newPost)

    if (error) {
      console.error('Error creating post:', error)
    } else {
      setPosts([...posts, data[0]])
    }
  }

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handleEditPost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post))
  }

  if (loading) {
    return <div>Loading...</div> // Show a loading state while checking
  }

 
  return (
    <main className="container mx-auto px-4 py-8">
      <Header user={user} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CreatePostForm onCreatePost={handleCreatePost} user={user} />
          <PostList
            posts={posts}
            user={user}
            onDeletePost={handleDeletePost}
            onEditPost={handleEditPost}
          />
        </div>
        <div>
          <TagCloud onSelectTag={setSelectedTag} selectedTag={selectedTag} />
        </div>
      </div>
    </main>
  )
}
