"use client"

import { useAuth } from "@/contexts/auth-context"
import { ProfileHeader } from "@/components/profile/profile-header"
import { EntrepreneurProfile } from "@/components/profile/entrepreneur-profile"
import { mockEntrepreneurs } from "@/lib/mock-data"

export default function EntrepreneurProfilePage() {
  const { user } = useAuth()

  if (!user || user.role !== "entrepreneur") {
    return null
  }

  // In a real app, this would fetch the full profile data
  // For now, we'll use mock data or extend the user object
  const fullProfile = mockEntrepreneurs.find((e) => e.email === user.email) || {
    ...user,
    role: "entrepreneur" as const,
    company: user.company || "My Company",
    industry: "Technology",
    fundingStage: "seed" as const,
    fundingGoal: "$1M",
    description: user.bio || "Entrepreneur passionate about innovation",
    achievements: ["Building innovative solutions"],
    technologies: ["React", "Node.js", "TypeScript"],
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your professional profile and information</p>
      </div>

      <ProfileHeader user={fullProfile} isOwnProfile={true} />

      <EntrepreneurProfile entrepreneur={fullProfile} />
    </div>
  )
}
