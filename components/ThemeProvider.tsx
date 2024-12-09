import { PropsWithChildren, useEffect, useState } from "react"
import { Provider as PaperProvider } from "react-native-paper"
import { useAppTheme } from "hooks/useAppTheme"

export function ThemeProvider({ children }: PropsWithChildren) {
  const { theme, isDark } = useAppTheme()
  const [themeVersion, setThemeVersion] = useState(0)

  // Força atualização quando o tema muda
  useEffect(() => {
    setThemeVersion((v) => v + 1)
  }, [isDark])

  return (
    <PaperProvider theme={theme} key={`theme-provider-${themeVersion}`}>
      {children}
    </PaperProvider>
  )
}
