"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { Search, MessageSquare } from "lucide-react"
import { useChat } from "@/contexts/chat-context"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

export function ChatSidebar() {
  const { user } = useAuth()
  const { conversations, activeConversationId, setActiveConversation } = useChat()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.participantDetails.some((participant) => participant.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  if (!user) return null

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-all focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <EmptyState
            icon={<MessageSquare className="h-8 w-8" />}
            title={searchTerm ? "No conversations found" : "No messages yet"}
            description={
              searchTerm
                ? "Try adjusting your search terms"
                : "Start a conversation by messaging someone from your network"
            }
          />
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => {
              const otherParticipant = conversation.participantDetails.find((p) => p.id !== user.id)
              if (!otherParticipant) return null

              const isActive = activeConversationId === conversation.id

              return (
                <div
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation.id)}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm",
                    isActive ? "bg-accent shadow-sm" : "hover:bg-muted/50",
                  )}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 ring-2 ring-transparent hover:ring-accent/20 transition-all">
                      <AvatarImage src={otherParticipant.avatar || "/placeholder.svg"} alt={otherParticipant.name} />
                      <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-accent rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-xs text-accent-foreground font-medium">
                          {conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{otherParticipant.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.lastMessage?.content || "No messages yet"}
                      </p>
                      <Badge variant="outline" className="text-xs capitalize border-accent/20">
                        {otherParticipant.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
