"use client"

import { useState } from "react"
import { CollaborationRequestCard } from "@/components/dashboard/collaboration-request-card"
import { mockCollaborationRequests } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function EntrepreneurRequestsPage() {
  const [requests, setRequests] = useState(mockCollaborationRequests)
  const router = useRouter()

  const handleAccept = (requestId: string) => {
    setRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "accepted" as const } : req)))
  }

  const handleDecline = (requestId: string) => {
    setRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "declined" as const } : req)))
  }

  const handleMessage = (userId: string) => {
    router.push(`/entrepreneur/messages?user=${userId}`)
  }

  const pendingRequests = requests.filter((req) => req.status === "pending")
  const acceptedRequests = requests.filter((req) => req.status === "accepted")
  const declinedRequests = requests.filter((req) => req.status === "declined")

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Collaboration Requests</h1>
        <p className="text-muted-foreground">Manage incoming collaboration requests from investors</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingRequests.length > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">{pendingRequests.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted
            {acceptedRequests.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {acceptedRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="declined">
            Declined
            {declinedRequests.length > 0 && (
              <Badge variant="outline" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {declinedRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingRequests.map((request) => (
                <CollaborationRequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onMessage={handleMessage}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pending collaboration requests.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedRequests.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {acceptedRequests.map((request) => (
                <CollaborationRequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onMessage={handleMessage}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No accepted collaboration requests yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="declined" className="space-y-4">
          {declinedRequests.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {declinedRequests.map((request) => (
                <CollaborationRequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onMessage={handleMessage}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No declined requests.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
