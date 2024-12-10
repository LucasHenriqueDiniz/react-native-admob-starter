import { Button, Icon } from "components"
import { useAppTheme, useRewardedAd, useRewardedAdPrompt } from "hooks"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Modal, Portal, Text } from "react-native-paper"
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
            <Icon icon="gift" size={32} color={theme.colors.onPrimary} />
          </View>
          <Text variant="headlineSmall" style={styles.title}>
            {t("common.wantToEarnCredits")}
          </Text>
          <Text variant="bodyMedium" style={styles.message}>
            {t("common.watchShortVideoToEarnCredits")}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              variant="contained"
              onPress={handleShowAd}
              loading={loading}
              icon={loading ? "loading" : "play"}
              style={styles.button}
            >
              {loading ? t("common.loading") : t("common.watchAd")}
            </Button>
            <Button variant="outlined" onPress={hide} disabled={loading} style={styles.button}>
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
    flex: 1,
    maxWidth: 200,
    minHeight: 48,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 16,
    width: "100%",
  },
  content: {
    alignItems: "center",
    maxWidth: 500,
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
    alignSelf: "center",
    borderRadius: 8,
    margin: 20,
    maxWidth: 500,
    padding: 20,
    width: "90%",
  },
  title: {
    textAlign: "center",
  },
})
