import { ErrorInfo } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"
import { useTranslation } from "react-i18next"
import { Screen } from "components"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text variant="headlineMedium" style={{ color: theme.colors.error }}>
            {t("error.title")}
          </Text>
          <Text variant="bodyLarge">{t("error.subtitle")}</Text>
        </View>

        <ScrollView
          style={[styles.errorSection, { backgroundColor: theme.colors.surfaceVariant }]}
          contentContainerStyle={styles.errorContent}
        >
          <Text variant="bodyMedium" style={{ color: theme.colors.error }}>
            {`${props.error}`.trim()}
          </Text>
          <Text selectable variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {`${props.errorInfo?.componentStack ?? ""}`.trim()}
          </Text>
        </ScrollView>

        <Button
          mode="contained"
          onPress={props.onReset}
          style={[styles.resetButton, { backgroundColor: theme.colors.error }]}
        >
          {t("error.reset")}
        </Button>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: 16,
  },
  errorContent: {
    gap: 8,
    padding: 16,
  },
  errorSection: {
    borderRadius: 8,
    flex: 1,
    marginVertical: 16,
    width: "100%",
  },
  resetButton: {
    paddingHorizontal: 32,
  },
  topSection: {
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
})
