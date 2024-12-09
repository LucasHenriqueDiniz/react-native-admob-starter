import { Language } from "types"
import { useTranslation } from "react-i18next"
import { List, RadioButton, useTheme } from "react-native-paper"

interface Props {
  selectedLanguage: Language
  onLanguageChange: (language: Language) => void
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: Props) {
  const { t } = useTranslation()
  const theme = useTheme()

  const languages: { label: string; value: Language }[] = [
    { label: t("language.pt"), value: "pt" },
    { label: t("language.en"), value: "en" },
    { label: t("language.es"), value: "es" },
  ]

  return (
    <List.Section>
      <List.Subheader style={{ color: theme.colors.onBackground }}>
        {t("settings.language")}
      </List.Subheader>
      <RadioButton.Group
        onValueChange={(value) => onLanguageChange(value as Language)}
        value={selectedLanguage}
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
    </List.Section>
  )
}
