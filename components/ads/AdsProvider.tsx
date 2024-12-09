import { PropsWithChildren, useEffect } from "react"
import mobileAds from "react-native-google-mobile-ads"

export function AdsProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    mobileAds()
      .initialize()
      .then(() => console.log("Ads initialized"))
      .catch(console.error)
  }, [])

  return children
}
