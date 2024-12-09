import type { Theme as NavigationTheme } from "@react-navigation/native"
import { DarkTheme, DefaultTheme } from "@react-navigation/native"
import { useCallback, useMemo } from "react"
import type { StyleProp, ViewStyle, TextStyle } from "react-native"
import { useColorScheme } from "react-native"
import { useThemeStore } from "store/useThemeStore"
import { darkTheme, lightTheme } from "theme/paperTheme"
import type { ThemedStyle } from "theme"

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

  const navigationTheme: NavigationTheme = useMemo(
    () => (isDark ? DarkTheme : DefaultTheme),
    [isDark],
  )

  const themed = useCallback(
    <T extends ViewStyle | TextStyle>(
      styles: (StyleProp<T> | ThemedStyle<T> | undefined | false)[],
    ) => {
      return styles.filter(Boolean) as StyleProp<T>
    },
    [],
  )

  return {
    theme,
    isDark,
    toggleTheme,
    navigationTheme,
    themed,
  }
}
