import * as Localization from "expo-localization"
import { I18nManager } from "react-native"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import "intl-pluralrules"

import en from "./en"
import ar from "./ar"
import ko from "./ko"
import es from "./es"
import fr from "./fr"
import ja from "./ja"
import hi from "./hi"
import pt from "./pt"

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  ko: { translation: ko },
  es: { translation: es },
  fr: { translation: fr },
  ja: { translation: ja },
  hi: { translation: hi },
  pt: { translation: pt },
}

export const isRTL = () => {
  const locales = Localization.getLocales()
  const languageCode = locales[0]?.languageCode || "en"
  return languageCode === "ar"
}

export const initI18n = async () => {
  const locales = Localization.getLocales()
  const languageCode = locales[0]?.languageCode || "en"

  await i18n.use(initReactI18next).init({
    resources,
    lng: languageCode,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

  // Handle RTL
  I18nManager.allowRTL(isRTL())
  I18nManager.forceRTL(isRTL())

  return i18n
}

export default i18n
