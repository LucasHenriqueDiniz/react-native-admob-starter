import { Button, Icon } from "components"
import Config from "config"
import { useAppTheme } from "hooks/useAppTheme"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Linking, StyleSheet, View } from "react-native"
import { Checkbox, Modal, Portal, Text } from "react-native-paper"
import { useRateUsStore } from "store/useRateUsStore"

export function RateUsModal() {
  const { t } = useTranslation()
  const { theme } = useAppTheme()
  const { isModalVisible, hideModal, dismissForever, onSuccessfulRate } = useRateUsStore()
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const handleRate = async () => {
    try {
      await Linking.openURL(Config.rateUsUrl)
      onSuccessfulRate?.()
      hideModal()
    } catch (error) {
      console.error("Error opening rate us URL:", error)
    }
  }

  const handleCancel = () => {
    if (dontShowAgain) {
      dismissForever()
    } else {
      hideModal()
    }
  }

  return (
    <Portal>
      <Modal
        visible={isModalVisible}
        onDismiss={hideModal}
        contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.content}>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon key={star} icon="star" size={32} color={theme.colors.primary} />
            ))}
          </View>
          <Text variant="headlineSmall" style={styles.title}>
            {t("rateUs.title")}
          </Text>
          <Text variant="bodyMedium" style={styles.message}>
            {t("rateUs.message")}
          </Text>
          <View style={styles.buttonContainer}>
            <Button variant="contained" onPress={handleRate} style={styles.button}>
              {t("rateUs.rateNow")}
            </Button>
            <Button variant="outlined" onPress={handleCancel} style={styles.button}>
              {t("common.cancel")}
            </Button>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={dontShowAgain ? "checked" : "unchecked"}
              onPress={() => setDontShowAgain(!dontShowAgain)}
            />
            <Text variant="bodySmall" onPress={() => setDontShowAgain(!dontShowAgain)}>
              {t("rateUs.dontRemind")}
            </Text>
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
    marginTop: 16,
    paddingVertical: 16,
    width: "100%",
  },
  checkboxContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  content: {
    alignItems: "center",
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
  starsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
  },
})
