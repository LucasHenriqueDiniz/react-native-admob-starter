import { StyleSheet, View, Linking } from "react-native"
import { Button, Modal, Portal, Text, Checkbox } from "react-native-paper"
import { useTranslation } from "react-i18next"
import { useRateUsStore } from "store/useRateUsStore"
import { useAppTheme } from "hooks/useAppTheme"
import Config from "config"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useState } from "react"

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
              <FontAwesome
                key={star}
                name="star"
                size={32}
                color={theme.colors.primary}
                style={styles.star}
              />
            ))}
          </View>
          <Text variant="headlineSmall" style={styles.title}>
            {t("rateUs.title")}
          </Text>
          <Text variant="bodyMedium" style={styles.message}>
            {t("rateUs.message")}
          </Text>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleRate} style={styles.button}>
              {t("rateUs.rateNow")}
            </Button>
            <Button mode="outlined" onPress={handleCancel} style={styles.button}>
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
    marginHorizontal: 8,
    minWidth: 120,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
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
  star: {
    marginHorizontal: 4,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
  },
})
