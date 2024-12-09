import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface RateUsState {
  lastShownAt: number | null
  isDismissedForever: boolean
  isModalVisible: boolean
  showModal: () => void
  hideModal: () => void
  dismissForever: () => void
  checkAndShowModal: () => void
  onSuccessfulRate?: () => void
  onDismissForever?: () => void
  setCallbacks: (callbacks: {
    onSuccessfulRate?: () => void
    onDismissForever?: () => void
  }) => void
}

const SHOW_INTERVAL = 30 * 60 * 1000 // 30 minutes in milliseconds

export const useRateUsStore = create<RateUsState>()(
  persist(
    (set, get) => ({
      lastShownAt: null,
      isDismissedForever: false,
      isModalVisible: false,
      onSuccessfulRate: undefined,
      onDismissForever: undefined,

      showModal: () => set({ isModalVisible: true, lastShownAt: Date.now() }),

      hideModal: () => set({ isModalVisible: false }),

      dismissForever: () => {
        set({ isDismissedForever: true, isModalVisible: false })
        get().onDismissForever?.()
      },

      checkAndShowModal: () => {
        const state = get()
        if (state.isDismissedForever) return

        const now = Date.now()
        if (!state.lastShownAt || now - state.lastShownAt >= SHOW_INTERVAL) {
          state.showModal()
        }
      },

      setCallbacks: (callbacks) => set(callbacks),
    }),
    {
      name: "rate-us-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
