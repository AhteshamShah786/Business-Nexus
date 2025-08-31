"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageBubble } from "./message-bubble"
import { useChat } from "@/contexts/chat-context"
import { useAuth } from "@/contexts/auth-context"
import { Send, Phone, Video, MoreVertical } from "lucide-react"

export function ChatInterface() {
  const { user } = useAuth()
  const { conversations, messages, activeConversationId, sendMessage } = useChat()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeConversation = conversations.find((conv) => conv.id === activeConversationId)
  const conversationMessages = activeConversationId ? messages[activeConversationId] || [] : []

  const otherParticipant = activeConversation?.participantDetails.find((p) => p.id !== user?.id)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversationMessages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeConversationId || !newMessage.trim()) return

    sendMessage(activeConversationId, newMessage)
    setNewMessage("")
  }

  if (!activeConversation || !otherParticipant) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherParticipant.avatar || "/placeholder.svg"} alt={otherParticipant.name} />
            <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{otherParticipant.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{otherParticipant.role}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversationMessages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          conversationMessages.map((message, index) => {
            const isOwn = message.senderId === user?.id
            const showAvatar = index === 0 || conversationMessages[index - 1].senderId !== message.senderId

            return (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={isOwn}
                senderName={isOwn ? user?.name : otherParticipant.name}
                senderAvatar={isOwn ? user?.avatar : otherParticipant.avatar}
                showAvatar={showAvatar}
              />
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${otherParticipant.name}...`}
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
