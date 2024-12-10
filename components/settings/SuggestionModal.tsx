import { Button, Icon } from "components"
import config from "config/index"
import { getLocales } from "expo-localization"
import { useAppLanguage, useAppTheme, useToast } from "hooks"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, View } from "react-native"
import { Modal, Portal, Text, TextInput } from "react-native-paper"
import { DiscordPayload } from "types"
import isValidEmail from "utils/isValidEmail"
import sendFeedbackToDiscord from "utils/sendFeedback"
import { storage } from "utils/storage"

interface SuggestionModalProps {
  visible: boolean
  onDismiss: () => void
}

export function SuggestionModal({ visible, onDismiss }: SuggestionModalProps) {
  const { t } = useTranslation()
  const { theme } = useAppTheme()
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
        contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
            <Icon icon="message-draw" size={32} color={theme.colors.onPrimary} />
          </View>

          <Text variant="headlineSmall" style={styles.title}>
            {t("settings.feedback.title")}
          </Text>

          <Text variant="bodyMedium" style={styles.subtitle}>
            {t("settings.feedback.subtitle")}
          </Text>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              mode="outlined"
              label={t("settings.feedback.title")}
              onChangeText={(text) => (formRef.current.title = text)}
              style={styles.input}
              disabled={loading}
              placeholder={t("settings.feedback.titlePlaceholder")}
              left={<TextInput.Icon icon="format-title" />}
            />

            <TextInput
              mode="outlined"
              label={t("settings.feedback.email")}
              onChangeText={(text) => (formRef.current.email = text)}
              keyboardType="email-address"
              style={styles.input}
              disabled={loading}
              placeholder={t("settings.feedback.emailPlaceholder")}
              left={<TextInput.Icon icon="email" />}
            />

            <TextInput
              mode="outlined"
              label={t("settings.feedback.content")}
              onChangeText={(text) => (formRef.current.content = text)}
              multiline
              numberOfLines={4}
              style={[styles.input, styles.textArea]}
              disabled={loading}
              placeholder={t("settings.feedback.descriptionPlaceholder")}
              left={<TextInput.Icon icon="text" />}
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              variant="contained"
              onPress={handleSubmit}
              loading={loading}
              style={styles.button}
              icon="send"
            >
              {t("common.send")}
            </Button>
            <Button variant="outlined" onPress={onDismiss} style={styles.button}>
              {t("common.cancel")}
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
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    marginBottom: 16,
    width: 80,
  },
  input: {
    marginBottom: 16,
    width: "100%",
  },
  modal: {
    alignSelf: "center",
    borderRadius: 16,
    margin: 20,
    maxHeight: "90%",
    maxWidth: 500,
    padding: 24,
    width: "90%",
  },
  scrollContent: {
    paddingBottom: 8,
  },
  scrollView: {
    flexGrow: 0,
    width: "100%",
  },
  subtitle: {
    marginBottom: 24,
    opacity: 0.7,
    textAlign: "center",
  },
  textArea: {
    minHeight: 100,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
})
