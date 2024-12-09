import { useCallback } from "react"
import { Alert } from "react-native"

export const useToast = () => {
  return useCallback((message: string) => {
    Alert.alert("", message)
  }, [])
}
