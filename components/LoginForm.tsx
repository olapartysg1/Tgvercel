"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Github, GitlabIcon, Mail } from "lucide-react"
import { handleLogin } from "@/app/actions"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatId) {
      setMessage("Chat ID is missing. Please provide it in the URL.")
      return
    }
    const result = await handleLogin(username, password, chatId)
    setMessage(result.message)
  }

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button variant="outline" className="w-full h-12 font-normal justify-start px-4">
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>
          <Button variant="outline" className="w-full h-12 font-normal justify-start px-4">
            <GitlabIcon className="mr-2 h-5 w-5" />
            Continue with GitLab
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <Button type="submit" className="w-full h-12">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {message && <p className="text-sm text-center w-full text-muted-foreground">{message}</p>}
        <Button variant="ghost" className="w-full h-12 font-normal">
          <Mail className="mr-2 h-5 w-5" />
          Continue with Email
        </Button>
      </CardFooter>
    </Card>
  )
}

