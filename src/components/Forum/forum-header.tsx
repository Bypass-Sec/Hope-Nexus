import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Plus, X } from "lucide-react"

interface ForumHeaderProps {
  tags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
  onSearch: (query: string) => void
  onCreatePost: (post: { title: string; content: string; tags: string[]; imageUrls: string[] }) => Promise<void>
  onAddCustomTag?: (tag: string) => void
  isLoggedIn: boolean
}

export function ForumHeader({
  tags,
  selectedTags,
  onTagSelect,
  onSearch,
  onCreatePost,
  onAddCustomTag,
  isLoggedIn,
}: ForumHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [postTags, setPostTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([""])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onCreatePost({ title, content, tags: postTags, imageUrls: imageUrls.filter((url) => url.trim() !== "") })
    setIsOpen(false)
    setTitle("")
    setContent("")
    setPostTags([])
    setImageUrls([""])
  }

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTag.trim() !== "" && !tags.includes(newTag.trim()) && onAddCustomTag) {
      onAddCustomTag(newTag.trim())
      setNewTag("")
    }
    setIsAddingTag(false)
  }

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""])
  }

  const handleRemoveImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls]
    newImageUrls[index] = value
    setImageUrls(newImageUrls)
  }

  return (
    <div className="mb-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search forums..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button disabled={!isLoggedIn}>{isLoggedIn ? "Create New Post" : "Log in to Create Post"}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new forum post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter post content"
                />
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={postTags.includes(tag) ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() =>
                        setPostTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Image URLs</Label>
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <Input
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder="Enter image URL"
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveImageUrl(index)}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={handleAddImageUrl} className="mt-2">
                  Add Image URL
                </Button>
              </div>
              <Button type="submit">Create Post</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </Badge>
        ))}
        {onAddCustomTag && (
          <div className="custom-tag-creation">
            {isAddingTag ? (
              <form onSubmit={handleAddCustomTag} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="New tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-24"
                />
                <Button type="submit" size="sm">
                  Add
                </Button>
              </form>
            ) : (
              <Button variant="outline" size="icon" onClick={() => setIsAddingTag(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

