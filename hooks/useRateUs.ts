import { useCallback } from "react"
import { useRateUsStore } from "store/useRateUsStore"

interface UseRateUsOptions {
  onSuccessfulRate?: () => void
  onDismissForever?: () => void
}

export function useRateUs(options: UseRateUsOptions = {}) {
  const { showModal, setCallbacks } = useRateUsStore()

  const openRateUsModal = useCallback(() => {
    setCallbacks({
      onSuccessfulRate: options.onSuccessfulRate,
      onDismissForever: options.onDismissForever,
    })
    showModal()
  }, [options.onSuccessfulRate, options.onDismissForever, setCallbacks, showModal])

  return { openRateUsModal }
}
