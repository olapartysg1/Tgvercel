import { NextResponse } from "next/server"

export async function POST(req) {
  const update = await req.json()

  if (update.message?.text === "/start") {
    const chatId = update.message.chat.id
    const uniqueUrl = `https://tgvercel.vercel.app/?id=${chatId}`
    const message = `Welcome! Here's your unique login URL: ${uniqueUrl}`

    await sendTelegramMessage(chatId, message)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: true })
}

export async function GET() {
  return new Response("Telegram Bot Webhook is active!", { status: 200 })
}

async function sendTelegramMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}

