"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push(user.role === "entrepreneur" ? "/entrepreneur" : "/investor")
    }
  }, [user, router])

  if (user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-in fade-in-50 duration-1000">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-12 w-12 text-accent mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Business Nexus</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The premier networking platform connecting entrepreneurs and investors for meaningful collaborations and
            growth opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 hover:shadow-lg transition-all">
              <Link href="/auth/register">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent hover:bg-accent/10 transition-all"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Connect & Network</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                Build meaningful relationships with entrepreneurs and investors in your industry and beyond.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Real-time Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                Communicate instantly with potential partners through our integrated messaging system.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Grow Together</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                Collaborate on projects, share resources, and accelerate your business growth.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Start Networking?</CardTitle>
              <CardDescription className="leading-relaxed">
                Join thousands of entrepreneurs and investors already growing their networks on Business Nexus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="text-lg px-8 hover:shadow-lg transition-all">
                <Link href="/auth/register">Join Business Nexus</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
