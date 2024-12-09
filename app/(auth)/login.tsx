import { Button } from "components/index"
import { Screen } from "components/Screen"
import * as Crypto from "expo-crypto"
import { Image } from "expo-image"
import { router } from "expo-router"
import { useAppTheme } from "hooks/useAppTheme"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Text, TextInput, TouchableRipple } from "react-native-paper"
import { useUserStore } from "store/useUserStore"
import isValidEmail from "utils/isValidEmail"

const LOGO_URL = require("assets/images/sora-icon.png")

export default function LoginScreen() {
  const { theme } = useAppTheme()
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = useUserStore((state) => state.login)

  const handleLogin = async () => {
    try {
      setError(null)
      setLoading(true)

      // Validações básicas
      if (!email.trim() || !password.trim()) {
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

      // Simula uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Gera um ID único usando crypto
      const id = await Crypto.randomUUID()

      // Login bem sucedido
      login({
        id,
        email: email.toLowerCase().trim(),
        name: email.split("@")[0], // Simplificado para exemplo
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
        <View style={styles.logoContainer}>
          <Image source={LOGO_URL} style={styles.logo} contentFit="contain" />
        </View>

        <Text variant="headlineMedium" style={styles.title}>
          {t("auth.welcome")}
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {t("auth.loginDescription")}
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
            error={!!error && error.includes("email")}
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
            error={!!error && error.includes("password")}
          />

          {error && <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>}

          <Button
            variant="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            loading={loading}
            disabled={loading || !email || !password}
          >
            {t("auth.login")}
          </Button>

          <TouchableRipple onPress={() => router.push("/(auth)/forgot-password")}>
            <Text style={[styles.forgotPassword, { color: theme.colors.primary }]}>
              {t("auth.forgotPassword")}
            </Text>
          </TouchableRipple>
        </View>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
          <Text style={[styles.orText, { color: theme.colors.onSurfaceVariant }]}>
            {t("auth.or")}
          </Text>
          <View style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
        </View>

        <View style={styles.socialButtons}>
          <Button
            variant="outlined"
            icon="google"
            style={styles.socialButton}
            onPress={() => {
              /* Implementar login com Google */
            }}
          >
            Google
          </Button>

          <Button
            variant="outlined"
            icon="apple"
            style={styles.socialButton}
            onPress={() => {
              /* Implementar login com Apple */
            }}
          >
            Apple
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {t("auth.noAccount")}
          </Text>
          <TouchableRipple onPress={() => router.push("/(auth)/signup")}>
            <Text style={[styles.signUpText, { color: theme.colors.primary }]}>
              {t("auth.signUp")}
            </Text>
          </TouchableRipple>
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
  divider: {
    flex: 1,
    height: 1,
  },
  dividerContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    marginVertical: 32,
  },
  errorText: {
    marginBottom: 16,
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 32,
  },
  forgotPassword: {
    marginTop: 16,
    textAlign: "center",
  },
  form: {
    marginTop: 32,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  logo: {
    height: 120,
    width: 120,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  orText: {
    textTransform: "uppercase",
  },
  signUpText: {
    fontWeight: "bold",
  },
  socialButton: {
    flex: 1,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 16,
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
})
