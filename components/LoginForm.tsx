"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
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
      <CardContent>
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
      <CardFooter>
        {message && <p className="text-sm text-center w-full text-muted-foreground">{message}</p>}
      </CardFooter>
    </Card>
  )
}

