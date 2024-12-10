import { MD3DarkTheme, MD3LightTheme, configureFonts } from "react-native-paper"
import type { MD3Theme } from "react-native-paper"
import { typography } from "./typography"

const baseFont = {
  fontFamily: typography.primary.normal,
}

const baseFontConfig = {
  displayLarge: baseFont,
  displayMedium: baseFont,
  displaySmall: baseFont,
  headlineLarge: baseFont,
  headlineMedium: baseFont,
  headlineSmall: baseFont,
  titleLarge: baseFont,
  titleMedium: baseFont,
  titleSmall: baseFont,
  bodyLarge: baseFont,
  bodyMedium: baseFont,
  bodySmall: baseFont,
  labelLarge: baseFont,
  labelMedium: baseFont,
  labelSmall: baseFont,
}

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#007AFF",
    onPrimary: "#FFFFFF",
    primaryContainer: "#80BDFF",
    secondary: "#007AFF",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#80BDFF",
    background: "#F6F6F6",
    surface: "#FFFFFF",
    surfaceVariant: "#F4F4F4",
    onSurface: "#000000",
    onSurfaceVariant: "#1C1B1F",
    onBackground: "#000000",
    outline: "rgba(0,0,0,0.12)",
    backdrop: "rgba(0, 0, 0, 0.5)",
    elevation: {
      level0: "transparent",
      level1: "#FFFFFF",
      level2: "#F6F6F6",
      level3: "#F4F4F4",
      level4: "#F2F2F2",
      level5: "#F0F0F0",
    },
  },
  fonts: configureFonts({ config: baseFontConfig }),
  isV3: true,
  version: 3,
}

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#007AFF",
    onPrimary: "#FFFFFF",
    primaryContainer: "#80BDFF",
    secondary: "#007AFF",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#80BDFF",
    background: "#121212",
    surface: "#1E1E1E",
    surfaceVariant: "#2C2C2C",
    onSurface: "#FFFFFF",
    onSurfaceVariant: "#E1E1E1",
    onBackground: "#FFFFFF",
    outline: "rgba(255,255,255,0.12)",
    backdrop: "rgba(0, 0, 0, 0.5)",
    elevation: {
      level0: "transparent",
      level1: "#1E1E1E",
      level2: "#222222",
      level3: "#242424",
      level4: "#272727",
      level5: "#2C2C2C",
    },
  },
  fonts: configureFonts({ config: baseFontConfig }),
  isV3: true,
  version: 3,
}
