import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MessageCircle, ThumbsUp, Trash2, Pin } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

// Initialize Supabase client


interface ForumCardProps {
  id: string;
  title: string;
  body: string;
  created_at: string;
  tags: string[];
  likes: string[];
  image_url: string[];
  is_pinned: boolean;
  user_id: string;
  replies: { count: number };
  onToggleMessages: (postId: string) => void;
  onToggleLike: (postId: string) => void;
  onDeletePost?: (postId: string) => Promise<void>;
  onTogglePin?: (postId: string) => Promise<void>;
  isExpanded: boolean;
  isLiked: boolean;
  isActionInProgress?: boolean;
  isPinned: boolean;
  currentUser: string | null;
  canManageMessage: (messageUserId: string) => boolean;
  isLoggedIn: boolean;
  onDeleteMessage?: (postId: string, replyId: string) => Promise<void>;
}

export function ForumCard({
  id,
  title,
  body,
  created_at,
  tags,
  likes,
  image_url,
  is_pinned,
  user_id,
  replies,
  onToggleMessages,
  onToggleLike,
  onDeletePost,
  onTogglePin,
  isExpanded,
  isLiked,
  isActionInProgress,
  isPinned,
  currentUser,
  canManageMessage,
  isLoggedIn,
}: ForumCardProps) {
  const [displayName, setDisplayName] = useState<string | null>(null);



  return (
    <Card className={`mb-4 ${isExpanded ? "bg-slate-50" : "bg-white"} ${isActionInProgress ? "opacity-75" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {isPinned && <Pin className="h-5 w-5 text-blue-500 rotate-45" />}
            <Avatar>
              <AvatarFallback>{(displayName || "NA").slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                {displayName || "Loading..."} • {new Date(created_at).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
          <div className="space-x-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
        {image_url.length > 0 && (
          <div className={`grid gap-2 mt-4 ${image_url.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
            {image_url.map((url, index) => (
              <img
                key={index}
                src={url || "/placeholder.svg"}
                alt={`Post image ${index + 1}`}
                className="w-full h-auto object-cover rounded"
              />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="flex items-center space-x-1"
            onClick={() => onToggleMessages(id)}
            disabled={!isLoggedIn}
          >
            <MessageCircle className={`h-5 w-5 ${isExpanded ? "text-blue-500" : ""}`} />
            <span>{replies.count}</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center space-x-1 ${isLiked ? "text-blue-500" : ""}`}
            onClick={() => onToggleLike(id)}
            disabled={isActionInProgress || !isLoggedIn}
          >
            <ThumbsUp className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            <span>{likes.length}</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {onTogglePin && (
            <Button variant="ghost" size="icon" onClick={() => onTogglePin(id)}>
              <Pin className={`h-5 w-5 ${isPinned ? "text-blue-500 rotate-45" : ""}`} />
            </Button>
          )}
          {onDeletePost && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
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
  );
}
