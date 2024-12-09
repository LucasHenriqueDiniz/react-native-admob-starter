import config from "config/index"
import { getLocales } from "expo-localization"
import { useAppLanguage } from "hooks/useAppLanguage"
import { useToast } from "hooks/useToast"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Modal, Portal, Text, TextInput, useTheme } from "react-native-paper"
import { DiscordPayload } from "types/index"
import isValidEmail from "utils/isValidEmail"
import sendFeedbackToDiscord from "utils/sendFeedback"
import { storage } from "utils/storage"

interface SuggestionModalProps {
  visible: boolean
  onDismiss: () => void
}

export function SuggestionModal({ visible, onDismiss }: SuggestionModalProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const { language } = useAppLanguage()
  const showToast = useToast()
  const [loading, setLoading] = useState(false)

  // Use refs for form fields
  const formRef = useRef({
    title: "",
    email: "",
    content: "",
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const storedEmail = await storage.getItem("userEmail")
      if (storedEmail !== formRef.current.email) {
        await storage.setItem("userEmail", formRef.current.email)
      }

      const countryCode = getLocales()[0].regionCode

      const payload: DiscordPayload = {
        content: `:bulb: New feature suggestion received!`,
        appName: config.appName,
        footer: {
          text: `Language: ${language?.toUpperCase() || "Unknown"} | Country: ${countryCode || "Unknown"}`,
        },
        embeds: [
          {
            title: "Feature Suggestion",
            description: formRef.current.title || "No title provided",
            color: 3447003, // Blue
            fields: [
              {
                name: ":memo: Description",
                value: formRef.current.content || "-",
              },
              formRef.current.email &&
                isValidEmail(formRef.current.email) && {
                  name: ":envelope: Contact Email",
                  value: formRef.current.email,
                  inline: true,
                },
            ].filter(Boolean) as { name: string; value: string; inline?: boolean }[],
          },
        ],
      }
      await sendFeedbackToDiscord(payload)
      onDismiss()
      showToast(t("settings.feedback.feedbackThanks"))
    } catch (error) {
      showToast(t("settings.feedback.feedbackError"))
      console.error("Error sending feedback:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.background }]}
      >
        <ScrollView>
          <Text
            variant="headlineMedium"
            style={[styles.title, { color: theme.colors.onBackground }]}
          >
            {t("settings.feedback.title")}
          </Text>

          <TextInput
            label={t("settings.feedback.title")}
            onChangeText={(text) => (formRef.current.title = text)}
            style={styles.input}
            disabled={loading}
            placeholder={t("settings.feedback.titlePlaceholder")}
          />

          <TextInput
            label={t("settings.feedback.email")}
            onChangeText={(text) => (formRef.current.email = text)}
            keyboardType="email-address"
            style={styles.input}
            disabled={loading}
            placeholder={t("settings.feedback.emailPlaceholder")}
          />

          <TextInput
            label={t("settings.feedback.content")}
            onChangeText={(text) => (formRef.current.content = text)}
            multiline
            numberOfLines={4}
            style={styles.input}
            disabled={loading}
            placeholder={t("settings.feedback.descriptionPlaceholder")}
          />

          <View style={styles.buttons}>
            <Button onPress={onDismiss} style={styles.button}>
              {t("common.cancel")}
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              {t("common.send")}
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  button: {
    minWidth: 100,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    marginTop: 16,
  },
  input: {
    marginBottom: 12,
  },
  modal: {
    borderRadius: 8,
    margin: 20,
    maxHeight: "80%",
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
})
