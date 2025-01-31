import { generateUniqueId, storeMapping, getAllUsers, getTotalUsers } from "@/lib/db"

const BOT_OWNER_ID = process.env.BOT_OWNER_ID

export async function POST(req) {
  const update = await req.json()
  const message = update.message

  if (!message) return new Response("OK")

  const chatId = message.chat.id
  const text = message.text

  if (text === "/start") {
    const uniqueId = await generateUniqueId()
    await storeMapping(uniqueId, chatId)

    const uniqueUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/?id=${uniqueId}`
    await sendTelegramMessage(chatId, `Here's your unique login page: ${uniqueUrl}`)
  } else if (text.startsWith("/broadcast") && chatId.toString() === BOT_OWNER_ID) {
    const broadcastMessage = text.slice("/broadcast".length).trim()
    if (broadcastMessage) {
      const users = await getAllUsers()
      const messageId = Date.now().toString()
      for (const user of users) {
        await sendTelegramMessage(user, broadcastMessage)
      }
      const totalUsers = await getTotalUsers()
      await sendTelegramMessage(chatId, `Broadcast sent to ${totalUsers} users. Message ID: ${messageId}`)
    } else {
      await sendTelegramMessage(chatId, "Please provide a message to broadcast.")
    }
  } else if (text === "/stats" && chatId.toString() === BOT_OWNER_ID) {
    const totalUsers = await getTotalUsers()
    await sendTelegramMessage(chatId, `Total users: ${totalUsers}`)
  }

  return new Response("OK")
}

async function sendTelegramMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}

