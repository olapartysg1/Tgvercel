// Simple in-memory store for demo purposes
// In production, use a real database
const urlMappings = new Map()

export function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15)
}

export function storeMapping(uniqueId, chatId) {
  urlMappings.set(uniqueId, chatId)
}

export function getChatId(uniqueId) {
  return urlMappings.get(uniqueId)
}

