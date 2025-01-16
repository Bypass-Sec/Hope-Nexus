import { useState, useEffect } from 'react';
import { supabase } from '../../app/lib/supabaseClient';

export default function TagManager({ postId, userId }) {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [postTags, setPostTags] = useState([]);

  useEffect(() => {
    fetchTags();
    fetchPostTags();
  }, []);

  const fetchTags = async () => {
    const { data, error } = await supabase.from('tags').select('*');
    if (error) {
      console.error('Error fetching tags:', error);
    } else {
      setTags(data);
    }
  };

  const fetchPostTags = async () => {
    const { data, error } = await supabase
      .from('post_tags')
      .select('*, tags(*)')
      .eq('post_id', postId);
    if (error) {
      console.error('Error fetching post tags:', error);
    } else {
      setPostTags(data.map(pt => pt.tags));
    }
  };

  const handleAddTag = async () => {
    let tagId;
    const existingTag = tags.find(t => t.name.toLowerCase() === newTag.toLowerCase());

    if (existingTag) {
      tagId = existingTag.id;
    } else {
      const { data, error } = await supabase
        .from('tags')
        .insert({ name: newTag, created_by_user_id: userId })
        .select();
      if (error) {
        console.error('Error creating new tag:', error);
        return;
      }
      tagId = data[0].id;
    }

    const { error } = await supabase
      .from('post_tags')
      .insert({ post_id: postId, tag_id: tagId });

    if (error) {
      console.error('Error adding tag to post:', error);
    } else {
      fetchPostTags();
      setNewTag('');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Tags</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {postTags.map(tag => (
          <span key={tag.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{tag.name}</span>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag..."
          className="flex-grow p-2 border rounded-l"
        />
        <button onClick={handleAddTag} className="bg-blue-500 text-white px-4 py-2 rounded-r">Add Tag</button>
      </div>
    </div>
  );
}

