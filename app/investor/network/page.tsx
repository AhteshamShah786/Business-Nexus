"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EntrepreneurCard } from "@/components/dashboard/entrepreneur-card"
import { EmptyState } from "@/components/ui/empty-state"
import { mockEntrepreneurs, type Entrepreneur } from "@/lib/mock-data"
import { Search, Filter, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function InvestorNetworkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [fundingStageFilter, setFundingStageFilter] = useState("all")
  const router = useRouter()

  const filteredEntrepreneurs = mockEntrepreneurs.filter((entrepreneur) => {
    const matchesSearch =
      entrepreneur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrepreneur.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrepreneur.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesIndustry = industryFilter === "all" || entrepreneur.industry === industryFilter
    const matchesFundingStage = fundingStageFilter === "all" || entrepreneur.fundingStage === fundingStageFilter

    return matchesSearch && matchesIndustry && matchesFundingStage
  })

  const handleRequestCollaboration = (entrepreneur: Entrepreneur) => {
    // In a real app, this would open a modal or navigate to a collaboration request form
    console.log("Requesting collaboration with:", entrepreneur.name)
    // For now, we'll just show an alert
    alert(`Collaboration request sent to ${entrepreneur.name}!`)
  }

  const handleSendMessage = (entrepreneur: Entrepreneur) => {
    // Navigate to messages with this entrepreneur
    router.push(`/investor/messages?user=${entrepreneur.id}`)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setIndustryFilter("all")
    setFundingStageFilter("all")
  }

  const industries = Array.from(new Set(mockEntrepreneurs.map((e) => e.industry)))
  const fundingStages = Array.from(new Set(mockEntrepreneurs.map((e) => e.fundingStage)))

  return (
    <div className="p-6 space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Entrepreneur Network</h1>
        <p className="text-muted-foreground">Discover and connect with innovative entrepreneurs</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search entrepreneurs, companies, or technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-all focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={fundingStageFilter} onValueChange={setFundingStageFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Funding Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {fundingStages.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage.replace("-", " ").toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredEntrepreneurs.length} entrepreneur{filteredEntrepreneurs.length !== 1 ? "s" : ""} found
          </p>
          <Button variant="outline" size="sm" className="bg-transparent hover:bg-accent/10 transition-all">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {filteredEntrepreneurs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntrepreneurs.map((entrepreneur) => (
              <EntrepreneurCard
                key={entrepreneur.id}
                entrepreneur={entrepreneur}
                onRequestCollaboration={handleRequestCollaboration}
                onSendMessage={handleSendMessage}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Users className="h-8 w-8" />}
            title="No entrepreneurs found"
            description="No entrepreneurs match your current search criteria. Try adjusting your filters or search terms."
            action={{
              label: "Clear Filters",
              onClick: clearFilters,
            }}
          />
        )}
      </div>
    </div>
  )
}
