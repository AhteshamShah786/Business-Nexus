"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-context"

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  participants: string[]
  participantDetails: {
    id: string
    name: string
    avatar?: string
    role: "entrepreneur" | "investor"
  }[]
  lastMessage?: Message
  unreadCount: number
  updatedAt: string
}

interface ChatContextType {
  conversations: Conversation[]
  messages: { [conversationId: string]: Message[] }
  activeConversationId: string | null
  setActiveConversation: (conversationId: string | null) => void
  sendMessage: (conversationId: string, content: string) => void
  markAsRead: (conversationId: string) => void
  getOrCreateConversation: (participantId: string) => string
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>({})
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      // Initialize with mock data
      initializeMockData()
    }
  }, [user])

  const initializeMockData = () => {
    const mockConversations: Conversation[] = [
      {
        id: "conv-1",
        participants: [user!.id, "inv-1"],
        participantDetails: [
          {
            id: "inv-1",
            name: "David Kim",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
            role: "investor",
          },
        ],
        unreadCount: 2,
        updatedAt: "2024-01-15T14:30:00Z",
      },
      {
        id: "conv-2",
        participants: [user!.id, "ent-2"],
        participantDetails: [
          {
            id: "ent-2",
            name: "Sarah Johnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
            role: "entrepreneur",
          },
        ],
        unreadCount: 0,
        updatedAt: "2024-01-14T10:15:00Z",
      },
    ]

    const mockMessages: { [conversationId: string]: Message[] } = {
      "conv-1": [
        {
          id: "msg-1",
          conversationId: "conv-1",
          senderId: "inv-1",
          content:
            "Hi! I'm very interested in your AI healthcare platform. Would you be available for a call this week?",
          timestamp: "2024-01-15T10:30:00Z",
          read: true,
        },
        {
          id: "msg-2",
          conversationId: "conv-1",
          senderId: user!.id,
          content:
            "Hello David! Thank you for reaching out. I'd be happy to discuss our platform with you. How about Thursday at 2 PM?",
          timestamp: "2024-01-15T11:15:00Z",
          read: true,
        },
        {
          id: "msg-3",
          conversationId: "conv-1",
          senderId: "inv-1",
          content: "Perfect! Thursday at 2 PM works great for me. I'll send you a calendar invite.",
          timestamp: "2024-01-15T14:20:00Z",
          read: false,
        },
        {
          id: "msg-4",
          conversationId: "conv-1",
          senderId: "inv-1",
          content:
            "Looking forward to learning more about your technology and discussing potential investment opportunities.",
          timestamp: "2024-01-15T14:30:00Z",
          read: false,
        },
      ],
      "conv-2": [
        {
          id: "msg-5",
          conversationId: "conv-2",
          senderId: "ent-2",
          content:
            "Hi! I saw your profile and thought there might be some interesting collaboration opportunities between our companies.",
          timestamp: "2024-01-14T09:45:00Z",
          read: true,
        },
        {
          id: "msg-6",
          conversationId: "conv-2",
          senderId: user!.id,
          content:
            "Hi Sarah! I'd love to explore potential collaborations. Your work in clean technology is really impressive.",
          timestamp: "2024-01-14T10:15:00Z",
          read: true,
        },
      ],
    }

    // Update last messages
    mockConversations.forEach((conv) => {
      const convMessages = mockMessages[conv.id] || []
      if (convMessages.length > 0) {
        conv.lastMessage = convMessages[convMessages.length - 1]
      }
    })

    setConversations(mockConversations)
    setMessages(mockMessages)
  }

  const setActiveConversation = (conversationId: string | null) => {
    setActiveConversationId(conversationId)
    if (conversationId) {
      markAsRead(conversationId)
    }
  }

  const sendMessage = (conversationId: string, content: string) => {
    if (!user || !content.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: user.id,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      read: true,
    }

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }))

    // Update conversation's last message and timestamp
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: newMessage,
              updatedAt: newMessage.timestamp,
            }
          : conv,
      ),
    )
  }

  const markAsRead = (conversationId: string) => {
    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv)))

    setMessages((prev) => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).map((msg) => ({ ...msg, read: true })),
    }))
  }

  const getOrCreateConversation = (participantId: string): string => {
    if (!user) return ""

    // Check if conversation already exists
    const existingConv = conversations.find((conv) => conv.participants.includes(participantId))

    if (existingConv) {
      return existingConv.id
    }

    // Create new conversation
    const newConvId = `conv-${Date.now()}`
    const newConversation: Conversation = {
      id: newConvId,
      participants: [user.id, participantId],
      participantDetails: [
        {
          id: participantId,
          name: "New Contact", // In real app, fetch from user data
          role: user.role === "entrepreneur" ? "investor" : "entrepreneur",
        },
      ],
      unreadCount: 0,
      updatedAt: new Date().toISOString(),
    }

    setConversations((prev) => [newConversation, ...prev])
    setMessages((prev) => ({ ...prev, [newConvId]: [] }))

    return newConvId
  }

  return (
    <ChatContext.Provider
      value={{
        conversations,
        messages,
        activeConversationId,
        setActiveConversation,
        sendMessage,
        markAsRead,
        getOrCreateConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
