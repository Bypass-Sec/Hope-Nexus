import { supabase } from './supabaseClient';

export async function trackTagInteraction(userId, tagId, postId = null) {
  const { data, error } = await supabase
    .from('User_tags')
    .upsert(
      { user_id: userId, tag_id: tagId, post_id: postId },
      { onConflict: ['user_id', 'tag_id'], ignoreDuplicates: false }
    );

  if (error) {
    console.error('Error tracking tag interaction:', error);
  }
}

export async function getPrioritizedTags(userId) {
  const { data, error } = await supabase
    .from('User_tags')
    .select('tag_id, tags(name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching prioritized tags:', error);
    return [];
  }

  return data.map(item => item.tags);
}

