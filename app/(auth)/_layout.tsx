import { Stack } from "expo-router"
import { useAppTheme } from "hooks/useAppTheme"

export default function AuthLayout() {
  const { theme } = useAppTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        animation: "slide_from_bottom",
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
        }}
      />
    </Stack>
  )
}
