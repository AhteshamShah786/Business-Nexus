"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ChatProvider, useChat } from "@/contexts/chat-context"

function MessagesContent() {
  const searchParams = useSearchParams()
  const { getOrCreateConversation, setActiveConversation } = useChat()
  const userId = searchParams.get("user")

  useEffect(() => {
    if (userId) {
      const conversationId = getOrCreateConversation(userId)
      setActiveConversation(conversationId)
    }
  }, [userId, getOrCreateConversation, setActiveConversation])

  return (
    <div className="flex h-full">
      <ChatSidebar />
      <ChatInterface />
    </div>
  )
}

export default function EntrepreneurMessagesPage() {
  return (
    <ChatProvider>
      <div className="h-[calc(100vh-4rem)]">
        <MessagesContent />
      </div>
    </ChatProvider>
  )
}
