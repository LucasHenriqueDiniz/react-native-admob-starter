import { PurchasesPackage } from "react-native-purchases"
import { storage } from "utils/storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ActiveSubscription {
  productId: string
  purchaseDate: string
  expiryDate: string | null
}

interface SubscriptionStore {
  subscriptions: PurchasesPackage[]
  activeSubscription: ActiveSubscription | null
  setSubscriptions: (subscriptions: PurchasesPackage[]) => void
  setActiveSubscription: (subscription: ActiveSubscription | null) => void
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set) => ({
      subscriptions: [],
      activeSubscription: null,
      setSubscriptions: (subscriptions) => set({ subscriptions }),
      setActiveSubscription: (subscription) => set({ activeSubscription: subscription }),
    }),
    {
      name: "subscription-storage",
      storage: createJSONStorage(() => storage),
    }
  )
)
