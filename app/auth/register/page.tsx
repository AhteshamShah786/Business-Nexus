import { RegisterForm } from "@/components/auth/register-form"
import { Building2 } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center mb-6">
            <Building2 className="h-8 w-8 text-accent mr-2" />
            <span className="text-2xl font-bold text-foreground">Business Nexus</span>
          </Link>
        </div>

        <RegisterForm />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
