import { useCallback, useEffect } from "react"
import { getLocales } from "expo-localization"
import { useLanguageStore } from "store/useLanguageStore"
import { Language } from "types"
import i18n from "i18next"

export const languages = [
  { label: "English", value: "en" },
  { label: "Português", value: "pt" },
  { label: "Español", value: "es" },
  { label: "日本語", value: "ja" },
  { label: "한국어", value: "ko" },
  { label: "हिंदी", value: "hi" },
  { label: "العربية", value: "ar" },
  { label: "Français", value: "fr" },
]

export function useAppLanguage() {
  const storedLanguage = useLanguageStore((state) => state.language)
  const setStoredLanguage = useLanguageStore((state) => state.setLanguage)

  // Inicializa com o idioma do sistema se não houver um salvo
  useEffect(() => {
    if (!storedLanguage) {
      const deviceLanguage = getLocales()[0].languageCode as Language
      const supportedLanguages: Language[] = ["en", "pt", "es", "ja", "ko", "hi", "ar", "fr"]

      if (supportedLanguages.includes(deviceLanguage)) {
        setStoredLanguage(deviceLanguage)
      } else {
        setStoredLanguage("en") // Fallback para inglês
      }
    }
  }, [storedLanguage, setStoredLanguage])

  // Atualiza o i18n quando o idioma muda
  useEffect(() => {
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage)
    }
  }, [storedLanguage])

  const changeLanguage = useCallback(
    (language: Language) => {
      setStoredLanguage(language)
    },
    [setStoredLanguage],
  )

  return {
    language: storedLanguage,
    changeLanguage,
  }
}
