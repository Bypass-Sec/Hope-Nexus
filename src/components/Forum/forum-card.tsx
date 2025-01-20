'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../Forum/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../Forum/ui/card"
import { Badge } from "../Forum/ui/badge"
import { Button } from "../Forum/ui/button"
import { MessageCircle, ThumbsUp, Trash2, Pin } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../Forum/ui/alert-dialog"

interface Message {
  id: number
  author: string
  content: string
}

interface ForumCardProps {
  id: number
  title: string
  author: string
  authorAvatar: string
  date: string
  content: string
  tags: string[]
  replies: number
  likes: number
  messages: Message[]
  imageUrls: string[]
  onToggleMessages: (postId: number) => void
  onToggleLike: (postId: number) => void
  onDeletePost?: ((postId: number) => void) | undefined
  onDeleteMessage: (postId: number, messageId: number) => void
  isExpanded: boolean
  isLiked: boolean
  isActionInProgress?: boolean
  isPinned?: boolean
  onTogglePin?: (postId: number) => void
  currentUser: string
  canManageMessage: (messageAuthor: string) => boolean
}

export function ForumCard({ 
  id, 
  title, 
  author, 
  authorAvatar, 
  date, 
  content, 
  tags, 
  replies, 
  likes, 
  messages, 
  imageUrls,
  onToggleMessages,
  onToggleLike,
  onDeletePost,
  onDeleteMessage,
  isExpanded,
  isLiked,
  isActionInProgress,
  isPinned,
  onTogglePin,
  currentUser,
  canManageMessage
}: ForumCardProps) {
  return (
    <Card 
      className={`mb-4 bg-white text-slate-900 border border-slate-200 transition-all duration-300 hover:shadow-md ${
        isExpanded ? 'bg-slate-50' : 'bg-white'
      } ${isActionInProgress ? 'opacity-75 pointer-events-none' : ''}`}
      onClick={() => onToggleMessages(id)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {isPinned && (
              <Pin className="h-5 w-5 text-blue-500 rotate-45" />
            )}
            <Avatar>
              <AvatarImage src={authorAvatar} alt={author} />
              <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="text-slate-500">{author} • {date}</CardDescription>
            </div>
          </div>
          <div className="space-x-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-slate-600">
        <p>{content}</p>
        {imageUrls.length > 0 && (
          <div className={`grid gap-2 mt-4 ${imageUrls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {imageUrls.map((url, index) => (
              <img key={index} src={url || "/placeholder.svg"} alt={`Post image ${index + 1}`} className="w-full h-auto object-cover rounded" />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between text-slate-600">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="flex items-center space-x-1" 
          >
            <MessageCircle className={`h-5 w-5 ${isExpanded ? 'text-blue-500' : ''}`} />
            <span>{replies}</span>
          </Button>
          <Button 
            variant="ghost" 
            className={`flex items-center space-x-1 ${isLiked ? 'text-blue-500' : ''}`} 
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(id);
            }}
            disabled={isActionInProgress}
          >
            <ThumbsUp className={`h-5 w-5 ${isLiked ? 'fill-current' : ''} ${
              isActionInProgress ? 'animate-pulse' : ''
            }`} />
            <span>{likes}</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {onTogglePin && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(id);
              }}
            >
              <Pin className={`h-5 w-5 ${isPinned ? 'text-blue-500' : ''} ${isPinned ? 'rotate-45' : ''}`} />
            </Button>
          )}
          {onDeletePost && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the post and all its messages.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeletePost(id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

