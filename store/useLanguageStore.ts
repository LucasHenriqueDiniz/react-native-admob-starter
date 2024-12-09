import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { storage } from "utils/storage/storage"
import { Language } from "../types"

interface LanguageStore {
  language: Language | null
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: null,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
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
