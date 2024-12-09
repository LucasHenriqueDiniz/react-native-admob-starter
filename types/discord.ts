export interface DiscordPayload {
  content: string
  appName: string
  footer: {
    text: string
  }
  embeds: Array<{
    title: string
    description: string
    color: number
    fields: Array<{
      name: string
      value: string
      inline?: boolean
    }>
  }>
}
