"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const searchParams = useSearchParams()
  const uniqueId = searchParams.get("id")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        uniqueId,
      }),
    })

    if (response.ok) {
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-8 font-serif">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-serif text-xl mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-serif text-xl mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
          Login
        </button>
      </form>
    </div>
  )
}

