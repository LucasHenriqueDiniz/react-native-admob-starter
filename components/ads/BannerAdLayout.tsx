import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads"
import { StyleSheet, View } from "react-native"
import Config from "config"
import { useUserStore } from "store/useUserStore"

export function BannerAdLayout({ children }: { children: React.ReactNode }) {
  const hasBannerRemoved = useUserStore((state) => state.hasBannerRemoved)

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      {!hasBannerRemoved && (
        <BannerAd
          unitId={Config.ads.bannerAdUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
})
