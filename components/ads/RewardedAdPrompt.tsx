/* eslint-disable react-native/no-color-literals */
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Modal, Portal, Text } from "react-native-paper"
import { useRewardedAd } from "../../hooks/useRewardedAd"
import { useTranslation } from "react-i18next"
import { useRewardedAdPrompt } from "hooks/useRewardedAdPrompt"
import { useAppTheme } from "hooks/useAppTheme"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useUserStore } from "store/useUserStore"

export function RewardedAdPrompt() {
  const [loading, setLoading] = useState(false)
  const addCredits = useUserStore((state: any) => state.addCredits)
  const { t } = useTranslation()
  const { theme } = useAppTheme()
  const { isVisible, hide } = useRewardedAdPrompt()

  const { showAd } = useRewardedAd({
    onAdDismissed: () => {
      hide()
      setLoading(false)
    },
    onAdSuccess: () => {
      addCredits(10)
    },
    onError: (error) => {
      console.error("Ad error:", error)
      setLoading(false)
    },
  })

  const handleShowAd = async () => {
    setLoading(true)
    await showAd()
  }

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={hide}
        contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
            <FontAwesome name="gift" size={32} color={theme.colors.onPrimary} />
          </View>
          <Text variant="headlineSmall" style={styles.title}>
            {t("common.wantToEarnCredits")}
          </Text>
          <Text variant="bodyMedium" style={styles.message}>
            {t("common.watchShortVideoToEarnCredits")}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleShowAd}
              style={styles.button}
              disabled={loading}
              icon={loading ? "loading" : "play"}
            >
              {loading ? t("common.loading") : t("common.watchAd")}
            </Button>
            <Button mode="outlined" onPress={hide} style={styles.button} disabled={loading}>
              {t("common.maybeLater")}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
    minWidth: 120,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  content: {
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    marginBottom: 16,
    width: 80,
  },
  message: {
    marginTop: 8,
    textAlign: "center",
  },
  modal: {
    borderRadius: 8,
    margin: 20,
    padding: 20,
  },
  title: {
    textAlign: "center",
  },
})
