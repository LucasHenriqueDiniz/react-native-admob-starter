import Purchases, { CustomerInfo, PurchasesPackage } from "react-native-purchases"
import { useCallback, useEffect, useState } from "react"
import Config from "config"

export function useSubscription() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [packages, setPackages] = useState<PurchasesPackage[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)

  // Initialize RevenueCat
  const initializeRevenueCat = useCallback(async () => {
    try {
      setLoading(true)
      await Purchases.configure({ apiKey: Config.revenueCat.apiKey })
      const info = await Purchases.getCustomerInfo()
      setCustomerInfo(info)
    } catch (err) {
      console.error("Failed to initialize RevenueCat:", err)
      setError("Failed to initialize payments")
    } finally {
      setLoading(false)
    }
  }, [])

  // Get available packages
  const getPackages = useCallback(async () => {
    try {
      setLoading(true)
      const offerings = await Purchases.getOfferings()
      const allPackages = [
        ...(offerings.current?.availablePackages || []), // Assinaturas
        ...(offerings.all.credits?.availablePackages || []), // Créditos - usando offerings.all
      ]
      setPackages(allPackages)
    } catch (err) {
      console.error("Failed to get packages:", err)
      setError("Failed to get subscription packages")
    } finally {
      setLoading(false)
    }
  }, [])

  // Purchase package
  const purchasePackage = useCallback(async (pack: PurchasesPackage) => {
    try {
      setLoading(true)
      const { customerInfo } = await Purchases.purchasePackage(pack)
      setCustomerInfo(customerInfo)
      return customerInfo
    } catch (err) {
      console.error("Failed to purchase:", err)
      setError("Failed to complete purchase")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Restore purchases
  const restorePurchases = useCallback(async () => {
    try {
      setLoading(true)
      const info = await Purchases.restorePurchases()
      setCustomerInfo(info)
      return info
    } catch (err) {
      console.error("Failed to restore:", err)
      setError("Failed to restore purchases")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    initializeRevenueCat()
  }, [initializeRevenueCat])

  return {
    loading,
    error,
    packages,
    customerInfo,
    getPackages,
    purchasePackage,
    restorePurchases,
  }
}
