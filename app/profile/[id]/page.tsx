"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProfileHeader } from "@/components/profile/profile-header"
import { EntrepreneurProfile } from "@/components/profile/entrepreneur-profile"
import { InvestorProfile } from "@/components/profile/investor-profile"
import { CollaborationRequestModal } from "@/components/profile/collaboration-request-modal"
import { mockEntrepreneurs, mockInvestors, type Entrepreneur, type Investor } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user: currentUser } = useAuth()
  const [profileUser, setProfileUser] = useState<Entrepreneur | Investor | null>(null)
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false)

  useEffect(() => {
    const userId = params.id as string

    // Find user in mock data
    const entrepreneur = mockEntrepreneurs.find((e) => e.id === userId)
    const investor = mockInvestors.find((i) => i.id === userId)

    if (entrepreneur) {
      setProfileUser(entrepreneur)
    } else if (investor) {
      setProfileUser(investor)
    } else {
      // User not found, redirect to dashboard
      if (currentUser) {
        router.push(`/${currentUser.role}`)
      }
    }
  }, [params.id, currentUser, router])

  const handleRequestCollaboration = async (data: { projectTitle: string; message: string }) => {
    if (!currentUser || !profileUser) return

    // In a real app, this would make an API call
    console.log("Sending collaboration request:", {
      from: currentUser.id,
      to: profileUser.id,
      projectTitle: data.projectTitle,
      message: data.message,
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success message
    alert(`Collaboration request sent to ${profileUser.name}!`)
  }

  const handleSendMessage = () => {
    if (!currentUser || !profileUser) return
    router.push(`/${currentUser.role}/messages?user=${profileUser.id}`)
  }

  if (!profileUser || !currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  const isOwnProfile = currentUser.id === profileUser.id

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-6">
          {/* Profile Header */}
          <ProfileHeader
            user={profileUser}
            isOwnProfile={isOwnProfile}
            onRequestCollaboration={() => setIsCollaborationModalOpen(true)}
            onSendMessage={handleSendMessage}
          />

          {/* Profile Content */}
          {profileUser.role === "entrepreneur" ? (
            <EntrepreneurProfile entrepreneur={profileUser as Entrepreneur} />
          ) : (
            <InvestorProfile investor={profileUser as Investor} />
          )}
        </div>

        {/* Collaboration Request Modal */}
        <CollaborationRequestModal
          isOpen={isCollaborationModalOpen}
          onClose={() => setIsCollaborationModalOpen(false)}
          targetUser={profileUser}
          onSubmit={handleRequestCollaboration}
        />
      </div>
    </div>
  )
}
