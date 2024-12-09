import { Screen } from "components/Screen"
import { useAppTheme } from "hooks/useAppTheme"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { router } from "expo-router"
import { useTranslation } from "react-i18next"
import { useToast } from "hooks/useToast"

export default function ForgotPasswordScreen() {
  const { theme } = useAppTheme()
  const { t } = useTranslation()
  const showToast = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleResetPassword = async () => {
    try {
      setError(null)
      setLoading(true)

      if (!email.trim()) {
        setError(t("auth.errorEmptyEmail"))
        return
      }

      if (!isValidEmail(email)) {
        setError(t("auth.errorInvalidEmail"))
        return
      }

      // Simula uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      showToast(t("auth.resetPasswordSuccess"))
      router.back()
    } catch (err) {
      setError(t("auth.errorGeneric"))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          {t("auth.forgotPasswordTitle")}
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {t("auth.forgotPasswordDescription")}
        </Text>

        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label={t("auth.email")}
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              setError(null)
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
            error={!!error}
          />

          {error && <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>}

          <Button
            mode="contained"
            onPress={handleResetPassword}
            style={styles.button}
            loading={loading}
            disabled={loading || !email}
          >
            {t("auth.resetPassword")}
          </Button>

          <Button mode="text" onPress={() => router.back()} style={styles.backButton}>
            {t("auth.backToLogin")}
          </Button>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 8,
  },
  button: {
    marginTop: 24,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  errorText: {
    marginBottom: 16,
    textAlign: "center",
  },
  form: {
    marginTop: 32,
  },
  input: {
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
})
