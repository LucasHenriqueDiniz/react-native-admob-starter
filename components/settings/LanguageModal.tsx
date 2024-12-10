import { Button } from "components"
import { languages } from "hooks/useAppLanguage"
import { useAppTheme } from "hooks/useAppTheme"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Modal, Portal, RadioButton, Text } from "react-native-paper"
import type { Language } from "types"

interface LanguageModalProps {
  visible: boolean
  onDismiss: () => void
  selectedLanguage: Language | null
  onSelectLanguage: (language: Language) => void
}

export function LanguageModal({
  visible,
  onDismiss,
  selectedLanguage,
  onSelectLanguage,
}: LanguageModalProps) {
  const { theme } = useAppTheme()
  const { t } = useTranslation()

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.background }]}
      >
        <Text variant="headlineMedium" style={styles.title}>
          {t("settings.language")}
        </Text>

        <RadioButton.Group
          onValueChange={(value) => onSelectLanguage(value as Language)}
          value={selectedLanguage || "en"}
        >
          {languages.map((lang) => (
            <RadioButton.Item
              key={lang.value}
              label={lang.label}
              value={lang.value}
              labelStyle={{ color: theme.colors.onBackground }}
              color={theme.colors.primary}
            />
          ))}
        </RadioButton.Group>

        <View style={styles.buttons}>
          <Button variant="text" onPress={onDismiss}>
            {t("common.cancel")}
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  buttons: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    marginTop: 16,
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
