import Config from "config"
import { ExternalPathString, Link } from "expo-router"
import { languages, useAppLanguage, useAppTheme } from "hooks"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Pressable, ScrollView, StyleSheet } from "react-native"
import { Button, Screen, LanguageModal, SuggestionModal } from "components"
import { Divider, List, Switch } from "react-native-paper"

export default function SettingsScreen() {
  const { t } = useTranslation()
  const { version, privacyUrl, termsUrl } = Config
  const { isDark, toggleTheme, theme } = useAppTheme()
  const { language, changeLanguage } = useAppLanguage()

  const [notifications, setNotifications] = useState(true)
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [languageModalVisible, setLanguageModalVisible] = useState(false)

  const pressedStyle = ({ pressed }: { pressed: boolean }) => [
    pressed && { backgroundColor: "rgba(0,0,0,0.05)", borderRadius: 12 },
  ]

  return (
    <Screen preset="scroll">
      <ScrollView style={styles.container}>
        <List.Section>
          <List.Subheader style={[styles.subheader, { color: theme.colors.onBackground }]}>
            {t("settings.feedback.feedbackAndSuggestions")}
          </List.Subheader>
          <Button
            icon="message-draw"
            onPress={() => setFeedbackVisible(true)}
            fullWidth
            iconPosition="right"
          >
            {t("settings.sendFeedback")}
          </Button>
        </List.Section>

        <Divider style={styles.sectionDivider} />

        <List.Section>
          <List.Subheader>{t("settings.preferences")}</List.Subheader>

          <Pressable style={pressedStyle}>
            <List.Item
              title={t("settings.notifications")}
              left={(props) => <List.Icon {...props} icon="bell-outline" />}
              right={() => <Switch value={notifications} onValueChange={setNotifications} />}
            />
          </Pressable>

          <Pressable style={pressedStyle}>
            <List.Item
              title={t("settings.darkMode")}
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => <Switch value={isDark} onValueChange={toggleTheme} />}
            />
          </Pressable>

          <Pressable style={pressedStyle}>
            <List.Item
              title={t("settings.language")}
              description={languages.find((l) => l.value === language)?.label}
              left={(props) => <List.Icon {...props} icon="translate" />}
              onPress={() => setLanguageModalVisible(true)}
            />
          </Pressable>
        </List.Section>

        <Divider style={styles.sectionDivider} />

        <List.Section>
          <List.Subheader>{t("settings.about")}</List.Subheader>
          <Pressable style={pressedStyle}>
            <List.Item
              title={t("settings.version")}
              description={version}
              left={(props) => <List.Icon {...props} icon="information-outline" />}
            />
          </Pressable>

          <Pressable style={pressedStyle}>
            <Link asChild href={termsUrl as ExternalPathString}>
              <List.Item
                title={t("settings.terms")}
                description={t("settings.termsDescription")}
                left={(props) => <List.Icon {...props} icon="file-document-outline" />}
              />
            </Link>
          </Pressable>

          <Pressable style={pressedStyle}>
            <Link asChild href={privacyUrl as ExternalPathString}>
              <List.Item
                title={t("settings.privacy")}
                description={t("settings.privacyDescription")}
                left={(props) => <List.Icon {...props} icon="shield-outline" />}
              />
            </Link>
          </Pressable>
        </List.Section>

        <SuggestionModal visible={feedbackVisible} onDismiss={() => setFeedbackVisible(false)} />

        <LanguageModal
          visible={languageModalVisible}
          onDismiss={() => setLanguageModalVisible(false)}
          selectedLanguage={language}
          onSelectLanguage={(newLanguage) => {
            changeLanguage(newLanguage)
            setLanguageModalVisible(false)
          }}
        />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionDivider: {
    marginVertical: 8,
  },
  subheader: {
    marginBottom: 8,
  },
})
