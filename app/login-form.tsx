"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { handleLogin } from "./actions"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatId) {
      setMessage("Invalid login URL. Please get a new URL from the Telegram bot.")
      return
    }
    try {
      const result = await handleLogin(username, password, chatId)
      setMessage(result.message)
      if (result.success) {
        setUsername("")
        setPassword("")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }
  }

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome</CardTitle>
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
            Submit
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {message && (
          <p
            className={`text-sm text-center w-full ${
              message.includes("error") ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {message}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

