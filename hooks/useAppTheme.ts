import { useColorScheme } from "react-native"
import { useThemeStore } from "store/useThemeStore"
import { useMemo, useCallback } from "react"
import { lightTheme, darkTheme } from "theme/paperTheme"

export function useAppTheme() {
  const systemColorScheme = useColorScheme()
  const { theme: storedTheme, setTheme } = useThemeStore()

  const isDark = useMemo(() => {
    if (storedTheme === "system") return systemColorScheme === "dark"
    return storedTheme === "dark"
  }, [storedTheme, systemColorScheme])

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark")
  }, [isDark, setTheme])

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark])

  return {
    theme,
    isDark,
    toggleTheme,
  }
}
