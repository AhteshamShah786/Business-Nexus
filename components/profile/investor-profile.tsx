import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Briefcase, DollarSign, Users } from "lucide-react"
import type { Investor } from "@/lib/mock-data"

interface InvestorProfileProps {
  investor: Investor
}

export function InvestorProfile({ investor }: InvestorProfileProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{investor.description}</p>
          </CardContent>
        </Card>

        {/* Investment Focus */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Investment Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {investor.investmentFocus.map((focus) => (
                <Badge key={focus} className="bg-accent/10 text-accent-foreground border-accent">
                  {focus}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expertise */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Areas of Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {investor.expertise.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Investment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Firm</p>
              <p className="font-medium">{investor.firm}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ticket Size</p>
              <p className="font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {investor.ticketSize}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Portfolio Size</p>
              <p className="font-medium flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {investor.portfolioSize} companies
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {investor.interests?.map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
