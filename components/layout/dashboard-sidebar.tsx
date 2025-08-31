"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Home,
  Users,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Briefcase,
  HandHeart,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!user) return null

  const navigationItems = [
    {
      title: "Dashboard",
      href: `/${user.role}`,
      icon: Home,
    },
    {
      title: user.role === "entrepreneur" ? "Investors" : "Entrepreneurs",
      href: `/${user.role}/network`,
      icon: Users,
    },
    {
      title: "Messages",
      href: `/${user.role}/messages`,
      icon: MessageSquare,
    },
    ...(user.role === "entrepreneur"
      ? [
          {
            title: "Requests",
            href: `/${user.role}/requests`,
            icon: HandHeart,
          },
        ]
      : []),
    {
      title: user.role === "entrepreneur" ? "My Projects" : "Investments",
      href: `/${user.role}/projects`,
      icon: user.role === "entrepreneur" ? Briefcase : TrendingUp,
    },
    {
      title: "Profile",
      href: `/${user.role}/profile`,
      icon: User,
    },
    {
      title: "Settings",
      href: `/${user.role}/settings`,
      icon: Settings,
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-sidebar-accent" />
            <span className="font-bold text-sidebar-foreground">Business Nexus</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent/10"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70 capitalize">{user.role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-foreground",
                    isCollapsed && "justify-center",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
            isCollapsed && "justify-center",
          )}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  )
}
