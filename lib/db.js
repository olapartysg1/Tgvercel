import { kv } from "@vercel/kv"

export async function generateUniqueId() {
  let uniqueId
  do {
    uniqueId = Math.random().toString(36).substring(2, 15)
  } while (await kv.exists(`mapping:${uniqueId}`))
  return uniqueId
}

export async function storeMapping(uniqueId, chatId) {
  await kv.set(`mapping:${uniqueId}`, chatId)
  await kv.sadd("all_users", chatId)
}

export async function getChatId(uniqueId) {
  return await kv.get(`mapping:${uniqueId}`)
}

export async function getAllUsers() {
  return await kv.smembers("all_users")
}

export async function incrementBroadcastCount(messageId) {
  return await kv.incr(`broadcast:${messageId}`)
}

export async function getBroadcastCount(messageId) {
  return await kv.get(`broadcast:${messageId}`)
}

export async function getTotalUsers() {
  return await kv.scard("all_users")
}

