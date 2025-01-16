import PostCard from './PostCard'

export default function PostList({ posts, user, onDeletePost, onEditPost }) {
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          user={user}
          onDelete={onDeletePost}
          onEdit={onEditPost}
        />
      ))}
    </div>
  )
}

