import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={["investor"]}>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}
