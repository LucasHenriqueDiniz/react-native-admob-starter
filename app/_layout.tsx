/* eslint-disable react-native/no-inline-styles */
import { ErrorBoundary } from "components/ErrorScreen/ErrorBoundary"
import { NetworkModal } from "components/NetworkModal"
import { RateUsModal } from "components/RateUsModal"
import { ThemeProvider } from "components/ThemeProvider"
import { AdsProvider } from "components/ads/AdsProvider"
import { RewardedAdPrompt } from "components/ads/RewardedAdPrompt"
import Config from "config"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useAdsStore } from "hooks/useAds"
import { useAppTheme } from "hooks/useAppTheme"
import { initI18n } from "i18n"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { KeyboardProvider } from "react-native-keyboard-controller"
import "react-native-reanimated"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { customFontsToLoad } from "theme"
import { loadDateFnsLocale } from "utils/formatDate"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const { theme, isDark } = useAppTheme()
  const initAds = useAdsStore((state: any) => state.initAds)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  useEffect(() => {
    if (fontLoadError) throw fontLoadError
  }, [fontLoadError])

  useEffect(() => {
    if (areFontsLoaded && isI18nInitialized) {
      SplashScreen.hideAsync()
    }
  }, [areFontsLoaded, isI18nInitialized])

  useEffect(() => {
    initAds()
  }, [initAds])

  if (!isI18nInitialized || (!areFontsLoaded && !fontLoadError)) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <KeyboardProvider>
          <ThemeProvider>
            <AdsProvider>
              <StatusBar style={isDark ? "light" : "dark"} />
              <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Stack
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: theme.colors.surface,
                    },
                    headerTintColor: theme.colors.onSurface,
                    contentStyle: {
                      backgroundColor: theme.colors.background,
                    },
                  }}
                >
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                </Stack>
              </View>
              <NetworkModal />
              <RateUsModal />
              <RewardedAdPrompt />
            </AdsProvider>
          </ThemeProvider>
        </KeyboardProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router"
