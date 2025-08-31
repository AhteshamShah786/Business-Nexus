import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Code, Target } from "lucide-react"
import type { Entrepreneur } from "@/lib/mock-data"

interface EntrepreneurProfileProps {
  entrepreneur: Entrepreneur
}

export function EntrepreneurProfile({ entrepreneur }: EntrepreneurProfileProps) {
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{entrepreneur.description}</p>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {entrepreneur.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Technologies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Technologies & Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {entrepreneur.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Industry</p>
              <p className="font-medium">{entrepreneur.industry}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Funding Stage</p>
              <Badge className={getFundingStageColor(entrepreneur.fundingStage)}>
                {entrepreneur.fundingStage.replace("-", " ").toUpperCase()}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Funding Goal</p>
              <p className="font-medium flex items-center">
                <Target className="h-4 w-4 mr-1" />
                {entrepreneur.fundingGoal}
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
              {entrepreneur.interests?.map((interest) => (
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
