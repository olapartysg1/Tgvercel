export async function POST(req) {
  try {
    const update = await req.json()

    if (update.message?.text === "/start") {
      // Send message using fetch instead of the bot library
      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: update.message.chat.id,
          text: "Hello! Your bot is working!",
        }),
      })
    }

    return new Response("OK", { status: 200 })
  } catch (error) {
    console.error("Error in webhook:", error)
    return new Response("Error", { status: 500 })
  }
}

export async function GET() {
  return new Response("Telegram Bot Webhook is active!", { status: 200 })
}

