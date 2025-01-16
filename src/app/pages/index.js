import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import PostCard from '../../components/(forums)/PostCard';
import TagManager from '../../components/(forums)/TagManager';
import { trackTagInteraction, getPrioritizedTags } from '../lib/TagPriorotization';
import CreatePostForm from '../../components/(forums)/CreatePostForm';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [prioritizedTags, setPrioritizedTags] = useState([]);
  const [envCheck, setEnvCheck] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEnvCheck(`SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not Set'}, SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not Set'}`);
    fetchPosts();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    checkUser();
  });

  useEffect(() => {
    if (user) {
      fetchPrioritizedTags();
    }
  }, [user]);

  const checkUser = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    console.log("Current user:", user);
    setUser(user);
    setLoading(false);
  };

  const fetchPosts = async () => {
    let query = supabase.from('posts').select('*');
    if (selectedTag) {
      query = query.eq('tags.name', selectedTag);
    }
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  const handleCreatePost = async (postData) => {
    const { data, error } = await supabase
      .from('posts')
      .insert({ 
        content: postData.content, 
        user_id: user.id, 
        image: { url: postData.image.url } 
      });

    if (error) {
      console.error('Error creating post:', error);
    } else {
      setPosts([...posts, data[0]]);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEditPost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const fetchPrioritizedTags = async () => {
    const tags = await getPrioritizedTags(user.id);
    setPrioritizedTags(tags);
  };

  const handleTagClick = async (tagId) => {
    setSelectedTag(tagId);
    if (user) {
      await trackTagInteraction(user.id, tagId);
      fetchPrioritizedTags();
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isMounted && (
        <details className="absolute inset-x-0 top-0 z-[999] cursor-pointer border-b border-yellow-100 bg-yellow-50 text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-900/50 dark:text-yellow-100">
          <summary>Details</summary>
          <p>This is some detail information.</p>
        </details>
      )}
      <h1 className="text-3xl font-bold mb-4">Discord-like Forum</h1>
      <p className="mb-4">Environment variables: {envCheck}</p>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <CreatePostForm onCreatePost={handleCreatePost} user={user} />
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Your Top Tags</h2>
            <div className="flex flex-wrap gap-2">
              {prioritizedTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id)}
                  className={`px-2 py-1 rounded ${selectedTag === tag.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
          {posts.map(post => (
            <div key={post.id}>
              <PostCard
                post={post}
                user={user}
                onDelete={handleDeletePost}
                onEdit={handleEditPost}
              />
              <TagManager postId={post.id} userId={user.id} />
            </div>
          ))}
        </div>
      ) : (
        <p>Please log in to view and create posts.</p>
      )}
    </div>
  );
}
