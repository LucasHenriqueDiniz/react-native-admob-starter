import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { storage } from "utils/storage/storage"

type ThemeMode = "light" | "dark" | "system"

interface ThemeStore {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => ({
        setItem: async (key, value) => {
          await storage.setItem(key, value)
        },
        getItem: async (key) => {
          const value = await storage.getItem(key)
          return value
        },
        removeItem: async (key) => {
          await storage.removeItem(key)
        },
      })),
    },
  ),
)
