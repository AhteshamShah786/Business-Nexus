"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import type { User } from "@/contexts/auth-context"

interface CollaborationRequestModalProps {
  isOpen: boolean
  onClose: () => void
  targetUser: User
  onSubmit: (data: { projectTitle: string; message: string }) => Promise<void>
}

export function CollaborationRequestModal({ isOpen, onClose, targetUser, onSubmit }: CollaborationRequestModalProps) {
  const [projectTitle, setProjectTitle] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectTitle.trim() || !message.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit({ projectTitle: projectTitle.trim(), message: message.trim() })
      setProjectTitle("")
      setMessage("")
      onClose()
    } catch (error) {
      console.error("Failed to send collaboration request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Collaboration</DialogTitle>
          <DialogDescription>Send a collaboration request to {targetUser.name}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src={targetUser.avatar || "/placeholder.svg"} alt={targetUser.name} />
            <AvatarFallback>{targetUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{targetUser.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{targetUser.role}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g., Investment Discussion, Partnership Opportunity"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and explain why you'd like to collaborate..."
              rows={4}
              required
            />
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !projectTitle.trim() || !message.trim()} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Request"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
