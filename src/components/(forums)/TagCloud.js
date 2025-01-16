import { useState, useEffect } from 'react'
import { supabase } from '../../app/lib/supabaseClient'

export default function TagCloud({ onSelectTag, selectedTag }) {
  const [tags, setTags] = useState([])

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('post_count', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Error fetching tags:', error)
    } else {
      setTags(data)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Popular Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => onSelectTag(tag.id)}
            className={`px-3 py-1 rounded-full text-sm font-semibold
              ${selectedTag === tag.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  )
}

