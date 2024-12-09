import { create } from "zustand"

interface RewardedAdPromptState {
  isVisible: boolean
  show: () => void
  hide: () => void
}

export const useRewardedAdPrompt = create<RewardedAdPromptState>((set) => ({
  isVisible: false,
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}))
