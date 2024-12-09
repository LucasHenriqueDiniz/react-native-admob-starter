import { useCallback, useEffect, useState } from "react"
import { RewardedAd, RewardedAdEventType, AdEventType } from "react-native-google-mobile-ads"
import Config from "config"

interface UseRewardedAdProps {
  onAdDismissed?: () => void
  onAdSuccess?: () => void
  onError?: (error: Error) => void
}

export function useRewardedAd({ onAdDismissed, onAdSuccess, onError }: UseRewardedAdProps) {
  const [loaded, setLoaded] = useState(false)
  const [adInstance] = useState(() =>
    RewardedAd.createForAdRequest(Config.ads.rewardedAdUnitId, {
      requestNonPersonalizedAdsOnly: true,
    }),
  )

  useEffect(() => {
    const unsubscribeLoaded = adInstance.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true)
    })

    const unsubscribeEarned = adInstance.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        onAdSuccess?.()
      },
    )

    const unsubscribeClosed = adInstance.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false)
      onAdDismissed?.()
      adInstance.load()
    })

    const unsubscribeError = adInstance.addAdEventListener(AdEventType.ERROR, (error) => {
      setLoaded(false)
      onError?.(error)
    })

    adInstance.load()

    return () => {
      unsubscribeLoaded()
      unsubscribeEarned()
      unsubscribeClosed()
      unsubscribeError()
    }
  }, [adInstance, onAdSuccess, onAdDismissed, onError])

  const showAd = useCallback(async () => {
    if (!loaded) return
    await adInstance.show()
  }, [adInstance, loaded])

  return {
    showAd,
    loaded,
  }
}
