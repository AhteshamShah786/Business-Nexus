"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Building2, TrendingUp, MessageSquare, Eye } from "lucide-react"
import type { Entrepreneur } from "@/lib/mock-data"
import Link from "next/link"

interface EntrepreneurCardProps {
  entrepreneur: Entrepreneur
  onRequestCollaboration: (entrepreneur: Entrepreneur) => void
  onSendMessage: (entrepreneur: Entrepreneur) => void
}

export function EntrepreneurCard({ entrepreneur, onRequestCollaboration, onSendMessage }: EntrepreneurCardProps) {
  const getFundingStageColor = (stage: string) => {
    switch (stage) {
      case "pre-seed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "seed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "series-a":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "series-b":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "growth":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="h-full hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1 group">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12 ring-2 ring-transparent group-hover:ring-accent/20 transition-all">
            <AvatarImage src={entrepreneur.avatar || "/placeholder.svg"} alt={entrepreneur.name} />
            <AvatarFallback>{entrepreneur.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg group-hover:text-accent transition-colors">{entrepreneur.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building2 className="h-4 w-4 mr-1" />
              {entrepreneur.company}
            </CardDescription>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {entrepreneur.location}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{entrepreneur.description}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Industry:</span>
            <span className="font-medium">{entrepreneur.industry}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Funding Goal:</span>
            <span className="font-medium text-accent">{entrepreneur.fundingGoal}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge className={getFundingStageColor(entrepreneur.fundingStage)}>
            {entrepreneur.fundingStage.replace("-", " ").toUpperCase()}
          </Badge>
          <Badge variant="outline" className="border-accent/20">
            <TrendingUp className="h-3 w-3 mr-1" />
            {entrepreneur.industry}
          </Badge>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Technologies:</p>
          <div className="flex flex-wrap gap-1">
            {entrepreneur.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs hover:bg-accent/10 transition-colors">
                {tech}
              </Badge>
            ))}
            {entrepreneur.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{entrepreneur.technologies.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            onClick={() => onRequestCollaboration(entrepreneur)}
            className="flex-1 hover:shadow-md transition-all"
            size="sm"
          >
            Request Collaboration
          </Button>
          <Button
            onClick={() => onSendMessage(entrepreneur)}
            variant="outline"
            size="sm"
            className="bg-transparent hover:bg-accent/10 transition-all"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button asChild variant="outline" size="sm" className="bg-transparent hover:bg-accent/10 transition-all">
            <Link href={`/profile/${entrepreneur.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
