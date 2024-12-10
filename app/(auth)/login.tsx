import { Button } from "components/Button"
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

interface FormState {
  email: string
  password: string
  showPassword: boolean
  error: string | null
}

export default function LoginScreen() {
  const { theme } = useAppTheme()
  const { t } = useTranslation()
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    showPassword: false,
    error: null,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const login = useUserStore((state) => state.login)

  const updateForm = (updates: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }))
  }

  const handleLogin = async () => {
    try {
      updateForm({ error: null })
      setLoading(true)
      const hasPassword = formState.password.length > 6
      const hasEmail = formState.email.length > 0
      const validEmail = isValidEmail(formState.email)

      // Validações básicas
      if (!hasEmail || !hasPassword) {
        updateForm({ error: t("error.emptyFields") })
        return
      }

      if (!validEmail) {
        updateForm({ error: t("error.invalidEmail") })
        return
      }

      if (!hasPassword) {
        updateForm({ error: t("error.passwordTooShort") })
        return
      }

      // Simula uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Gera um ID único usando crypto
      const id = await Crypto.randomUUID()

      // Login bem sucedido
      login({
        id,
        email: formState.email.toLowerCase().trim(),
        name: formState.email.split("@")[0], // Simplificado para exemplo
      })

      router.back()
    } catch (err) {
      updateForm({ error: t("error.generic") })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formState.email.length > 0 && formState.password.length > 0

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
            value={formState.email}
            onChangeText={(text) => updateForm({ email: text, error: null })}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
            error={!!formState.error && formState.error.includes("email")}
          />

          <TextInput
            mode="outlined"
            label={t("auth.password")}
            value={formState.password}
            onChangeText={(text) => updateForm({ password: text, error: null })}
            secureTextEntry={!formState.showPassword}
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={formState.showPassword ? "eye-off" : "eye"}
                onPress={() => updateForm({ showPassword: !formState.showPassword })}
              />
            }
            error={!!formState.error && formState.error.includes("password")}
          />

          {formState.error && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>{formState.error}</Text>
          )}

          <Button
            variant="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            loading={loading}
            disabled={!isFormValid}
          >
            {t("auth.login")}
          </Button>

          <Button
            variant="text"
            uppercase={false}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ paddingVertical: 6 }}
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            {t("auth.forgotPassword")}
          </Button>
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
            uppercase={false}
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.socialButton}
            onPress={() => {
              /* Implementar login com Google */
            }}
          >
            {t("common.google")}
          </Button>

          <Button
            variant="outlined"
            icon="apple"
            uppercase={false}
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.socialButton}
            onPress={() => {
              /* Implementar login com Apple */
            }}
          >
            {t("common.apple")}
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
    maxWidth: 160,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
})
