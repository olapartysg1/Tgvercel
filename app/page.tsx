import { Suspense } from "react"
import LoginForm from "./login-form"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center">Secure Login</h1>
        <p className="text-muted-foreground text-center mt-2">Enter your credentials to continue</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

