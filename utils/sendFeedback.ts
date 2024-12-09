import { DiscordPayload } from "../types"
import Config from "../config"

export default async function sendFeedbackToDiscord(payload: DiscordPayload) {
  try {
    const response = await fetch(Config.api.discordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    return response.ok
  } catch (error) {
    console.error("Error sending feedback:", error)
    throw error
  }
}
