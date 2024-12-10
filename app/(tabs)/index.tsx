import { Screen, Button } from "components"
import { useRateUs } from "hooks/useRateUs"
import { useRewardedAd } from "hooks/useRewardedAd"
import { useRewardedAdPrompt } from "hooks/useRewardedAdPrompt"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { useNetworkStore } from "store/useNetworkStore"
import { useUserStore } from "store/useUserStore"

export default function TabOneScreen() {
  const { t } = useTranslation()
  const credits = useUserStore((state: any) => state.credits)
  const addCredits = useUserStore((state: any) => state.addCredits)
  const [loading, setLoading] = useState(false)
  const { setModalVisible: showNetworkModal } = useNetworkStore()

  const { openRateUsModal } = useRateUs({
    onSuccessfulRate: () => {
      addCredits(10)
    },
  })

  const { show: showRewardedAdPrompt } = useRewardedAdPrompt()

  const { showAd, loaded } = useRewardedAd({
    onAdDismissed: () => setLoading(false),
    onAdSuccess: () => {
      addCredits(10)
      setLoading(false)
    },
    onError: (error) => {
      console.error("Ad error:", error)
      setLoading(false)
    },
  })

  const handleShowAd = async () => {
    try {
      setLoading(true)
      await showAd()
    } catch (error) {
      console.error("Error showing ad:", error)
      setLoading(false)
    }
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {t("tabs.home")}
        </Text>
        <Text variant="titleMedium" style={styles.credits}>
          {t("home.credits", { count: credits })}
        </Text>
        <View style={styles.buttonContainer}>
          <Button variant="contained" onPress={openRateUsModal}>
            debug: openRateUsModal
          </Button>
          <Button variant="contained" onPress={showRewardedAdPrompt}>
            debug: showRewardedAdPrompt
          </Button>
          <Button variant="contained" onPress={handleShowAd} disabled={loading || !loaded}>
            debug: handleShowAd
          </Button>
          <Text>Debug: IsLoading: {loading ? "true" : "false"}</Text>
          <Text>Debug: Loaded: {loaded ? "true" : "false"}</Text>
          <Button variant="outlined" onPress={() => showNetworkModal(true)}>
            Test Network Modal
          </Button>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    gap: 8,
    marginTop: 20,
    width: "100%",
  },
  content: {
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  credits: {
    marginTop: 8,
  },
  title: {
    marginBottom: 20,
  },
})
