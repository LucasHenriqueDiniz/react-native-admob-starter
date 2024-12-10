import { Button, Screen } from "components"
import { router } from "expo-router"
import { useAppTheme, useToast } from "hooks"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Text, TextInput } from "react-native-paper"
import isValidEmail from "utils/isValidEmail"

export default function ForgotPasswordScreen() {
  const { theme } = useAppTheme()
  const { t } = useTranslation()
  const showToast = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResetPassword = async () => {
    try {
      setError(null)
      setLoading(true)

      if (!email.trim()) {
        setError(t("error.emptyEmail"))
        return
      }

      if (!isValidEmail(email)) {
        setError(t("error.invalidEmail"))
        return
      }

      // Simula uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      showToast(t("auth.resetPasswordSuccess"))
      router.back()
    } catch (err) {
      setError(t("error.generic"))
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
            variant="elevated"
            onPress={handleResetPassword}
            loading={loading}
            disabled={!email}
          >
            {t("auth.resetPassword")}
          </Button>

          <Button variant="text" onPress={() => router.back()} icon="arrow-left" size="small">
            {t("auth.backToLogin")}
          </Button>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
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
