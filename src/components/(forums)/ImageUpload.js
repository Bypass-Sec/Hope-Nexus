import { useState } from 'react'
import { supabase } from '../../app/lib/supabaseClient'

export default function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false)

  const uploadImage = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath)

      if (urlError) {
        throw urlError
      }

      onUpload(publicUrl)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          dark:file:bg-gray-700 dark:file:text-gray-200
          dark:hover:file:bg-gray-600"
      />
      {uploading && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Uploading...</p>}
    </div>
  )
}

