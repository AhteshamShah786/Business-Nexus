"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building2, Mail, MessageSquare, HandHeart } from "lucide-react"
import type { Entrepreneur, Investor } from "@/lib/mock-data"

interface ProfileHeaderProps {
  user: Entrepreneur | Investor
  isOwnProfile: boolean
  onRequestCollaboration?: () => void
  onSendMessage?: () => void
}

export function ProfileHeader({ user, isOwnProfile, onRequestCollaboration, onSendMessage }: ProfileHeaderProps) {
  return (
    <div className="bg-card rounded-lg p-6 border">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar and Basic Info */}
        <div className="flex flex-col items-center md:items-start">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Badge className="capitalize">{user.role}</Badge>
        </div>

        {/* Main Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{user.bio}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{user.role === "entrepreneur" ? (user as Entrepreneur).company : (user as Investor).firm}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {!isOwnProfile && (
            <div className="flex space-x-3 pt-4">
              <Button onClick={onRequestCollaboration} className="flex-1 md:flex-none">
                <HandHeart className="h-4 w-4 mr-2" />
                Request Collaboration
              </Button>
              <Button onClick={onSendMessage} variant="outline" className="flex-1 md:flex-none bg-transparent">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
