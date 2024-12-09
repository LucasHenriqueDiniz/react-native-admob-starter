import { StyleSheet, View } from "react-native"
import { Card, Text } from "react-native-paper"
import { PlansCarousel } from "components/premium/PlansCarousel"
import { useTranslation } from "react-i18next"
import { useRewardedAd } from "hooks/useRewardedAd"
import { useState } from "react"
import { useAppTheme } from "hooks/useAppTheme"
import { Screen } from "components/Screen"
import { useToast } from "hooks/useToast"
import { Icon, Button } from "components"

export default function PremiumScreen() {
  const { theme } = useAppTheme()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const showToast = useToast()

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

  const handleSubscribe = (planIndex: number) => {
    console.log("Subscribe to plan", planIndex)
  }

  const PREMIUM_PLANS = [
    {
      title: t("premium.monthly"),
      price: t("premium.priceMonthly"),
      description: t("premium.monthlyDescription"),
    },
    {
      title: t("premium.yearly"),
      price: t("premium.priceYearly"),
      description: t("premium.yearlyDescription"),
      featured: true,
    },
  ]

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

        <PlansCarousel plans={PREMIUM_PLANS} onSubscribe={handleSubscribe} />

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
          <Card.Actions>
            <Button
              variant="contained"
              onPress={handleWatchAd}
              style={styles.adButton}
              loading={loading}
              disabled={loading}
            >
              {t("premium.watchAd")}
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  adButton: {
    flex: 1,
    marginBottom: 8,
    marginHorizontal: 8,
    paddingVertical: 8,
  },
  adCard: {
    borderRadius: 16,
    marginHorizontal: 24,
  },
  adCardContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    paddingVertical: 8,
  },
  adTextContainer: {
    flex: 1,
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
