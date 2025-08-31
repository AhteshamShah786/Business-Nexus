import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function EntrepreneurLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={["entrepreneur"]}>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}
