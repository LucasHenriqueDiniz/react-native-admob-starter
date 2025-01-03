import { Button, Screen } from "components"
import * as Crypto from "expo-crypto"
import { router } from "expo-router"
import { useAppTheme } from "hooks/useAppTheme"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Text, TextInput } from "react-native-paper"
import { useUserStore } from "store/useUserStore"

export default function SignUpScreen() {
  const { theme } = useAppTheme()
  const { t } = useTranslation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = useUserStore((state) => state.login)

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSignUp = async () => {
    try {
      setError(null)
      setLoading(true)

      // Validações básicas
      if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        setError(t("error.emptyFields"))
        return
      }

      if (!isValidEmail(email)) {
        setError(t("error.invalidEmail"))
        return
      }

      if (password.length < 6) {
        setError(t("error.passwordTooShort"))
        return
      }

      if (password !== confirmPassword) {
        setError(t("error.passwordsDontMatch"))
        return
      }

      // Simula uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Gera um ID único usando crypto
      const id = await Crypto.randomUUID()

      // Cadastro bem sucedido
      login({
        id,
        email: email.toLowerCase().trim(),
        name: name.trim(),
      })

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
          {t("auth.createAccount")}
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {t("auth.signupDescription")}
        </Text>

        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label={t("auth.name")}
            value={name}
            onChangeText={(text) => {
              setName(text)
              setError(null)
            }}
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

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
          />

          <TextInput
            mode="outlined"
            label={t("auth.password")}
            value={password}
            onChangeText={(text) => {
              setPassword(text)
              setError(null)
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <TextInput
            mode="outlined"
            label={t("auth.confirmPassword")}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text)
              setError(null)
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="lock-check" />}
          />

          {error && <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>}

          <Button
            variant="contained"
            onPress={handleSignUp}
            style={styles.button}
            loading={loading}
            disabled={loading || !email || !password || !name || !confirmPassword}
          >
            {t("auth.signUp")}
          </Button>

          <Button
            variant="text"
            onPress={() => router.back()}
            style={styles.backButton}
            loading={loading}
            disabled={loading}
            size="small"
          >
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
