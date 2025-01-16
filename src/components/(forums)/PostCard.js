import { useState, useEffect } from 'react'
import { supabase } from '../../app/lib/supabaseClient'
import ImageUpload from './ImageUpload'

export default function PostCard({ post, user, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(post.content)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [reactions, setReactions] = useState({})
  const [imageUrl, setImageUrl] = useState(post.image?.url || null)

  useEffect(() => {
    fetchComments()
    fetchReactions()
  }, [])

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post.id)
    if (error) {
      console.error('Error fetching comments:', error)
    } else {
      setComments(data || [])
    }
  }

  const fetchReactions = async () => {
    const { data, error } = await supabase
      .from('reactions')
      .select('type')
      .eq('post_id', post.id)
    if (error) {
      console.error('Error fetching reactions:', error)
    } else {
      const reactionCounts = data.reduce((acc, reaction) => {
        acc[reaction.type] = (acc[reaction.type] || 0) + 1
        return acc
      }, {})
      setReactions(reactionCounts)
    }
  }

  const handleEdit = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ content: editedContent, image: { url: imageUrl } })
      .eq('id', post.id)
      .select()

    if (error) {
      console.error('Error updating post:', error)
    } else if (data && data[0]) {
      onEdit(data[0])
      setIsEditing(false)
    }
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', post.id)

    if (error) {
      console.error('Error deleting post:', error)
    } else {
      onDelete(post.id)
    }
  }

  const handleAddComment = async () => {
    const { data, error } = await supabase
      .from('comments')
      .insert({ post_id: post.id, user_id: user.id, content: newComment })
      .select()

    if (error) {
      console.error('Error adding comment:', error)
    } else if (data && data[0]) {
      setComments([...comments, data[0]])
      setNewComment('')
    }
  }

  const handleReaction = async (type) => {
    const { data, error } = await supabase
      .from('reactions')
      .upsert({ post_id: post.id, user_id: user.id, type }, { onConflict: ['post_id', 'user_id'] })
      .select()

    if (error) {
      console.error('Error adding reaction:', error)
    } else {
      await fetchReactions()
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        {isEditing ? (
          <div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <ImageUpload onUpload={(url) => setImageUrl(url)} />
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Save</button>
          </div>
        ) : (
          <div>
            <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
            {imageUrl && <img src={imageUrl || "/placeholder.svg"} alt="Post image" className="mt-2 max-w-full h-auto rounded" />}
            <div className="mt-2">
              <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-2">Edit</button>
              <button onClick={handleDelete} className="text-red-500">Delete</button>
            </div>
          </div>
        )}
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
        />
        <button onClick={handleAddComment} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Comment</button>
        {comments.map((comment) => (
          <div key={comment.id} className="mt-2 p-2 bg-white dark:bg-gray-600 rounded">
            <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-200 dark:bg-gray-600 p-4 flex justify-between items-center">
        <div>
          {Object.entries(reactions).map(([type, count]) => (
            <span key={type} className="mr-2">{type}: {count}</span>
          ))}
        </div>
        <div>
          <button onClick={() => handleReaction('👍')} className="mr-2 text-2xl">👍</button>
          <button onClick={() => handleReaction('❤️')} className="mr-2 text-2xl">❤️</button>
          <button onClick={() => handleReaction('😂')} className="mr-2 text-2xl">😂</button>
        </div>
      </div>
    </div>
  )
}
