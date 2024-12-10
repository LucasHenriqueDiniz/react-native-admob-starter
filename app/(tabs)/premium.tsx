import { Button, Icon, Screen, SubscriptionList } from "components"
import { useAppTheme, useRewardedAd, useSubscription, useToast } from "hooks"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Card, Text } from "react-native-paper"

export default function PremiumScreen() {
  const { theme } = useAppTheme()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const showToast = useToast()
  const { customerInfo } = useSubscription()

  const { showAd } = useRewardedAd({
    onAdDismissed: () => setLoading(false),
    onAdSuccess: () => {
      showToast("AD SUCCESS")
      setLoading(false)
    },
    onError: (error) => {
      console.error("Ad error:", error)
      setLoading(false)
    },
  })

  const handleWatchAd = async () => {
    setLoading(true)
    await showAd()
  }

  const isPremium = customerInfo?.entitlements.active.premium?.isActive

  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Icon icon="crown" size={40} color={theme.colors.primary} />
          <Text variant="headlineMedium">{t("premium.title")}</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {t("premium.subtitle")}
          </Text>
        </View>

        <SubscriptionList />

        {!isPremium && (
          <>
            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
              <Text variant="titleMedium" style={[styles.orText, { color: theme.colors.primary }]}>
                {t("premium.or")}
              </Text>
              <View style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
            </View>

            <Card style={styles.adCard} mode="outlined">
              <Card.Content style={styles.adCardContent}>
                <Icon icon="play-circle" size={32} color={theme.colors.primary} />
                <View style={styles.adTextContainer}>
                  <Text variant="bodyMedium">{t("premium.watchAd")}</Text>
                  <Text variant="bodySmall">{t("premium.watchAdDescription")}</Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.adCardActions}>
                <Button
                  variant="contained"
                  onPress={handleWatchAd}
                  loading={loading}
                  fullWidth
                  size="large"
                  icon="play-circle"
                  uppercase={false}
                >
                  {t("premium.watchAd")}
                </Button>
              </Card.Actions>
            </Card>
          </>
        )}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  adCard: {
    borderRadius: 16,
    marginHorizontal: 24,
    overflow: "hidden",
  },
  adCardActions: {
    flexDirection: "column",
    margin: 0,
    paddingBottom: 12,
    paddingRight: 24,
    width: "100%",
  },
  adCardContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    padding: 16,
  },
  adTextContainer: {
    flex: 1,
    marginLeft: 4,
  },
  divider: {
    flex: 1,
    height: 2,
  },
  dividerContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    gap: 8,
    paddingBottom: 24,
  },
  orText: {
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  root: {
    flex: 1,
    minHeight: "100%",
    paddingBottom: 24,
  },
  subtitle: {
    opacity: 0.7,
    paddingHorizontal: 32,
    textAlign: "center",
  },
})
