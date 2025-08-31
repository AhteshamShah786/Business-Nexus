"use client"

import { useAuth } from "@/contexts/auth-context"
import { ProfileHeader } from "@/components/profile/profile-header"
import { InvestorProfile } from "@/components/profile/investor-profile"
import { mockInvestors } from "@/lib/mock-data"

export default function InvestorProfilePage() {
  const { user } = useAuth()

  if (!user || user.role !== "investor") {
    return null
  }

  // In a real app, this would fetch the full profile data
  // For now, we'll use mock data or extend the user object
  const fullProfile = mockInvestors.find((i) => i.email === user.email) || {
    ...user,
    role: "investor" as const,
    firm: user.company || "Investment Firm",
    investmentFocus: ["Technology", "Innovation"],
    ticketSize: "$500K - $2M",
    portfolioSize: 5,
    description: user.bio || "Investor passionate about supporting entrepreneurs",
    expertise: ["Technology", "Strategy", "Growth"],
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your professional profile and information</p>
      </div>

      <ProfileHeader user={fullProfile} isOwnProfile={true} />

      <InvestorProfile investor={fullProfile} />
    </div>
  )
}
