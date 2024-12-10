import * as fs from "fs"
import { languages } from "hooks/useAppLanguage"
import ar from "i18n/ar"
import en from "i18n/en"
import es from "i18n/es"
import fr from "i18n/fr"
import hi from "i18n/hi"
import ja from "i18n/ja"
import ko from "i18n/ko"
import pt from "i18n/pt"
import * as path from "path"
import { Language } from "types/language"
import { flattenObject } from "utils/flattenObject"

// Helper functions first
const IGNORED_KEYS = ["window", "@"]

const findTranslationKeysInFile = (filePath: string): string[] => {
  const content = fs.readFileSync(filePath, "utf8")

  // Procurar apenas por padrões específicos de uso de tradução
  // Ex: t('chave'), t("chave")
  const matches = content.match(/t\(['"]([\w.-]+)['"]\)/g) || []
  return matches
    .map((match) => match.replace(/t\(['"](.+)['"]\)/, "$1"))
    .filter((key) => !IGNORED_KEYS.includes(key))
}

const findFilesRecursively = (dir: string): string[] => {
  let results: string[] = []
  const items = fs.readdirSync(dir)

  items.forEach((item) => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      results = results.concat(findFilesRecursively(fullPath))
    } else if (
      stat.isFile() &&
      (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) &&
      !fullPath.endsWith(".test.ts") &&
      !fullPath.endsWith(".test.tsx")
    ) {
      results.push(fullPath)
    }
  })

  return results
}

const findTranslationKeysInFiles = (): string[] => {
  const usedKeys: string[] = []
  const appDir = path.join(process.cwd(), "app")
  const componentsDir = path.join(process.cwd(), "components")

  const files = [...findFilesRecursively(appDir), ...findFilesRecursively(componentsDir)]

  files.forEach((file: string) => {
    const keys = findTranslationKeysInFile(file)
    usedKeys.push(...keys)
  })

  return [...new Set(usedKeys)] // Remove duplicates
}

// Test suite
describe("i18n", () => {
  describe("Translation Files", () => {
    const languageFiles = {
      ar,
      en,
      es,
      fr,
      hi,
      ja,
      ko,
      pt,
    }

    const IGNORED_KEYS = ["window"] // Keys to ignore in the test

    it("should have all translations defined in EN", () => {
      const usedKeys = findTranslationKeysInFiles()
      const enKeys = Object.keys(flattenObject(en))

      const missingInEN = usedKeys
        .filter((key) => !IGNORED_KEYS.includes(key))
        .filter((key) => !enKeys.includes(key))

      if (missingInEN.length > 0) {
        throw new Error(
          `Found keys being used that are not defined in EN translation file:\n${missingInEN.join("\n")}`,
        )
      }

      // Only check other languages if all keys exist in EN
      languages.forEach((lang) => {
        const langKeys = Object.keys(flattenObject(languageFiles[lang.value as Language]))
        const missingKeys = enKeys.filter((key: string) => !langKeys.includes(key))

        if (missingKeys.length > 0) {
          throw new Error(
            `Problem in ${lang.label.toUpperCase()} (${lang.value}) language file:\nMissing keys:\n${missingKeys.join("\n")}`,
          )
        }
      })
    })
  })
})
