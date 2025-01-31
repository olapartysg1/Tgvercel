import { generateUniqueId, storeMapping } from "@/lib/db"

export async function POST(req) {
  const update = await req.json()

  if (update.message?.text === "/start") {
    const chatId = update.message.chat.id
    const uniqueId = generateUniqueId()
    storeMapping(uniqueId, chatId)

    const uniqueUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/?id=${uniqueId}`
    const message = `Here's your unique login page: ${uniqueUrl}`

    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
  }

  return new Response("OK")
}

