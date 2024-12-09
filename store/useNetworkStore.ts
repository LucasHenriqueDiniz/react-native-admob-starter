import { create } from "zustand"
import NetInfo from "@react-native-community/netinfo"

interface NetworkState {
  isConnected: boolean
  isModalVisible: boolean
  checkConnection: () => Promise<boolean>
  startConnectionCheck: () => void
  stopConnectionCheck: () => void
  setModalVisible: (visible: boolean) => void
}

const CHECK_INTERVAL = 5 * 60 * 1000 // 5 minutes in milliseconds

export const useNetworkStore = create<NetworkState>((set, get) => {
  let intervalId: NodeJS.Timeout | null = null
  let unsubscribe: (() => void) | null = null

  const checkConnection = async () => {
    const state = await NetInfo.fetch()
    const isConnected = !!state.isConnected
    set({ isConnected })

    // Se não estiver conectado, mostra o modal
    if (!isConnected) {
      set({ isModalVisible: true })
    }

    return isConnected
  }

  const startConnectionCheck = () => {
    if (intervalId) return

    // Initial check
    checkConnection()

    // Setup interval check
    intervalId = setInterval(async () => {
      const isConnected = await checkConnection()
      if (!isConnected) {
        set({ isModalVisible: true })
      }
    }, CHECK_INTERVAL)

    // Subscribe to connection changes
    unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = !!state.isConnected
      set({ isConnected })

      // Se perder a conexão, mostra o modal
      if (!isConnected) {
        set({ isModalVisible: true })
      }
    })
  }

  const stopConnectionCheck = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  return {
    isConnected: true,
    isModalVisible: false,
    checkConnection,
    startConnectionCheck,
    stopConnectionCheck,
    setModalVisible: (visible) => {
      // Só permite fechar o modal se estiver conectado
      if (!visible || get().isConnected) {
        set({ isModalVisible: visible })
      }
    },
  }
})
