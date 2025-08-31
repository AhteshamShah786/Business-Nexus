"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Check, X, MessageSquare } from "lucide-react"
import type { CollaborationRequest } from "@/lib/mock-data"

interface CollaborationRequestCardProps {
  request: CollaborationRequest
  onAccept: (requestId: string) => void
  onDecline: (requestId: string) => void
  onMessage: (userId: string) => void
}

export function CollaborationRequestCard({ request, onAccept, onDecline, onMessage }: CollaborationRequestCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "declined":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-accent/20 transition-all">
              <AvatarImage src={request.fromUser.avatar || "/placeholder.svg"} alt={request.fromUser.name} />
              <AvatarFallback>{request.fromUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base group-hover:text-accent transition-colors">
                {request.fromUser.name}
              </CardTitle>
              <CardDescription className="capitalize">{request.fromUser.role}</CardDescription>
              {request.projectTitle && (
                <p className="text-sm font-medium text-foreground mt-1">{request.projectTitle}</p>
              )}
            </div>
          </div>
          <Badge className={getStatusColor(request.status)}>{request.status.toUpperCase()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{request.message}</p>

        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {formatDate(request.createdAt)}
        </div>

        {request.status === "pending" && (
          <div className="flex space-x-2">
            <Button onClick={() => onAccept(request.id)} size="sm" className="flex-1 hover:shadow-md transition-all">
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button
              onClick={() => onDecline(request.id)}
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <X className="h-4 w-4 mr-1" />
              Decline
            </Button>
          </div>
        )}

        {request.status === "accepted" && (
          <Button
            onClick={() => onMessage(request.fromUserId)}
            variant="outline"
            size="sm"
            className="w-full bg-transparent hover:bg-accent/10 transition-all"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Send Message
          </Button>
        )}

        {request.status === "declined" && (
          <div className="text-center py-2">
            <p className="text-sm text-muted-foreground">Request declined</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
