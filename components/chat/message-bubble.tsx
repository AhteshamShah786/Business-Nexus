import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Message } from "@/contexts/chat-context"

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  senderName?: string
  senderAvatar?: string
  showAvatar?: boolean
}

export function MessageBubble({ message, isOwn, senderName, senderAvatar, showAvatar = true }: MessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className={cn("flex items-end space-x-2 mb-4", isOwn && "flex-row-reverse space-x-reverse")}>
      {showAvatar && !isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar || "/placeholder.svg"} alt={senderName || "User"} />
          <AvatarFallback>{senderName?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col", isOwn ? "items-end" : "items-start")}>
        <div
          className={cn(
            "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl",
            isOwn ? "bg-accent text-accent-foreground rounded-br-sm" : "bg-muted text-muted-foreground rounded-bl-sm",
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">{formatTime(message.timestamp)}</span>
      </div>

      {showAvatar && isOwn && (
        <div className="h-8 w-8" /> // Spacer to maintain alignment
      )}
    </div>
  )
}
