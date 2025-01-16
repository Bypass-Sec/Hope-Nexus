import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import PostCard from '../../components/(forums)/PostCard';
import TagManager from '../../components/(forums)/TagManager';
import { trackTagInteraction, getPrioritizedTags } from '../../app/lib/TagPriorotization';
import ImageUpload from '../../components/(forums)/ImageUpload';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [prioritizedTags, setPrioritizedTags] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  useEffect(() => {
    if (user) {
      fetchPrioritizedTags();
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('User data:', user);
      setUser(user || null);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      let query = supabase.from('posts').select('*');
      if (selectedTag) {
        query = query.eq('tags.name', selectedTag);
      }
      const { data, error } = await query;
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({ 
          content: newPostContent, 
          user_id: user.id, 
          image: { url: newPostImage } 
        })
        .select();

      if (error) throw error;
      if (data && data[0]) {
        setPosts(prevPosts => [...prevPosts, data[0]]);
        setNewPostContent('');
        setNewPostImage(null);
      } else {
        console.error('Unexpected response structure:', data);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const handleEditPost = (updatedPost) => {
    setPosts(prevPosts => prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const fetchPrioritizedTags = async () => {
    try {
      const tags = await getPrioritizedTags(user.id);
      setPrioritizedTags(tags || []);
    } catch (error) {
      console.error('Error fetching prioritized tags:', error);
    }
  };

  const handleTagClick = async (tagId) => {
    setSelectedTag(tagId);
    if (user) {
      try {
        await trackTagInteraction(user.id, tagId);
        await fetchPrioritizedTags();
      } catch (error) {
        console.error('Error handling tag click:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Discord-like Forum</h1>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <div className="mb-4">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border rounded"
            />
            <ImageUpload onUpload={(url) => setNewPostImage(url)} />
            <button onClick={handleCreatePost} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Create Post</button>
          </div>
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
      <p>Debug: User ID: {user?.id}, User Name: {user?.user_metadata?.name}</p>
    </div>
  );
}
