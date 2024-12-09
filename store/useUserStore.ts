import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { storage } from "utils/storage/storage"

interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
}

interface UserStore {
  credits: number
  lastAdWatch: number | null
  hasBannerRemoved: boolean
  isLoggedIn: boolean
  profile: UserProfile | null
  addCredits: (amount: number) => void
  removeCredits: (amount: number) => void
  setLastAdWatch: (timestamp: number) => void
  removeBanner: () => void
  login: (profile: UserProfile) => void
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      credits: 0,
      lastAdWatch: null,
      hasBannerRemoved: false,
      isLoggedIn: false,
      profile: null,
      addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),
      removeCredits: (amount) => set((state) => ({ credits: Math.max(0, state.credits - amount) })),
      setLastAdWatch: (timestamp) => set({ lastAdWatch: timestamp }),
      removeBanner: () => set({ hasBannerRemoved: true }),
      login: (profile) => set({ isLoggedIn: true, profile }),
      logout: () => set({ isLoggedIn: false, profile: null }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => storage),
    },
  ),
)
