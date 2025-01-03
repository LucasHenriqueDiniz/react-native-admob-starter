/* eslint-disable react-native/no-inline-styles */
import { Button, Icon, Screen } from "components"
import { useAppTheme, useCountdown, useRewardedAd, useSubscription } from "hooks"
import { useToast } from "hooks/useToast"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Card, Text } from "react-native-paper"
import { useUserStore } from "store/useUserStore"
import type { PurchasesPackage } from "react-native-purchases"

const AD_COOLDOWN = 5 * 60 * 1000 // 5 minutes in milliseconds

export default function StoreScreen() {
  const { theme } = useAppTheme()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const showToast = useToast()
  const { lastAdWatch, setLastAdWatch, hasBannerRemoved, removeBanner, credits, addCredits } =
    useUserStore()
  const { packages, purchasePackage, loading: purchaseLoading } = useSubscription()

  const creditPackages = packages.filter(
    (pkg) => pkg.product.identifier.startsWith("credits_") || pkg.identifier.startsWith("credits_")
  )

  const canWatchAd = !lastAdWatch || Date.now() - lastAdWatch >= AD_COOLDOWN

  const { showAd } = useRewardedAd({
    onAdDismissed: () => setLoading(false),
    onAdSuccess: () => {
      addCredits(10)
      setLastAdWatch(Date.now())
      showToast("Earned 10 credits!")
      setLoading(false)
    },
    onError: (error) => {
      console.error("Ad error:", error)
      setLoading(false)
    },
  })

  const handleWatchAd = async () => {
    if (!canWatchAd) return
    setLoading(true)
    await showAd()
  }

  const handlePurchaseCredits = async (pkg: PurchasesPackage) => {
    try {
      const customerInfo = await purchasePackage(pkg)
      if (customerInfo) {
        // Extrair a quantidade de créditos do identificador do produto
        // Exemplo: "credits_100" -> 100 créditos
        const amount = parseInt(pkg.product.identifier.split("_")[1])
        addCredits(amount)
        showToast(t("store.purchaseSuccess"))
      }
    } catch (error) {
      console.error("Purchase error:", error)
      showToast(t("store.purchaseError"))
    }
  }

  const remainingSeconds = useCountdown(lastAdWatch)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Icon icon="wallet" size={40} color={theme.colors.primary} />
          <Text variant="headlineMedium" style={styles.credits}>
            {t("store.yourCredits", { amount: credits })}
          </Text>
          <View style={[styles.headerDivider, { backgroundColor: theme.colors.outline }]} />
        </View>

        <Card style={styles.card} mode="outlined">
          <View style={[styles.cardDivider, { backgroundColor: theme.colors.outline }]} />
          {!canWatchAd && (
            <View style={[styles.overlay, { backgroundColor: theme.colors.backdrop }]}>
              <View style={styles.timerContainer}>
                <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
                  {formatTime(remainingSeconds)}
                </Text>
              </View>
            </View>
          )}
          <Card.Content style={styles.adCardContent}>
            <Icon icon="play-circle" size={32} color={theme.colors.primary} />
            <View style={styles.adTextContainer}>
              <Text variant="bodyMedium">{t("store.watchAdTitle")}</Text>
              <Text variant="bodySmall">{t("store.watchAdDescription")}</Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              variant="contained"
              onPress={handleWatchAd}
              fullWidth
              loading={loading}
              disabled={loading || !canWatchAd}
            >
              {t("store.watchAdButton")}
            </Button>
          </Card.Actions>
        </Card>

        <View style={styles.orDividerContainer}>
          <View style={[styles.orDivider, { backgroundColor: theme.colors.outline }]} />
          <Text variant="titleMedium" style={[styles.orText, { color: theme.colors.primary }]}>
            or
          </Text>
          <View style={[styles.orDivider, { backgroundColor: theme.colors.outline }]} />
        </View>

        <View style={styles.packages}>
          {creditPackages.map((pkg, index) => (
            <Card
              key={pkg.identifier}
              style={[
                styles.packageCard,
                index === 1 && [styles.packageCardMedium, { borderColor: theme.colors.primary }],
                index === 2 && [styles.packageCardBest, { borderColor: theme.colors.primary }],
              ]}
              mode="outlined"
            >
              {index === 2 && (
                <View style={[styles.bestValueBadge, { backgroundColor: theme.colors.primary }]}>
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.inverseSurface, fontWeight: "bold" }}
                  >
                    {t("store.bestValue")}
                  </Text>
                </View>
              )}
              <Card.Content style={styles.packageContent}>
                <View style={[styles.packageHeader, index === 2 && styles.packageHeaderBest]}>
                  <Icon icon="cash-plus" size={24} color={theme.colors.primary} />
                  <Text variant="titleMedium" style={styles.packageTitle}>
                    {pkg.product.title}
                  </Text>
                </View>
                <Text
                  variant="titleLarge"
                  style={[styles.packagePrice, { color: theme.colors.primary }]}
                >
                  {pkg.product.priceString}
                </Text>
              </Card.Content>
              <Card.Actions style={styles.packageActions}>
                <Button
                  variant="contained"
                  fullWidth
                  loading={purchaseLoading}
                  onPress={() => handlePurchaseCredits(pkg)}
                >
                  {t("store.buyNow")}
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>

        <View style={styles.orDividerContainer}>
          <View style={[styles.orDivider, { backgroundColor: theme.colors.outline }]} />
          <Text variant="titleMedium" style={[styles.orText, { color: theme.colors.primary }]}>
            or
          </Text>
          <View style={[styles.orDivider, { backgroundColor: theme.colors.outline }]} />
        </View>

        {!hasBannerRemoved ? (
          <Card style={styles.card} mode="outlined">
            <View style={[styles.cardDivider, { backgroundColor: theme.colors.outline }]} />
            <Button
              variant="contained"
              onPress={removeBanner}
              style={styles.removeBannerButton}
              contentStyle={styles.removeBannerContent}
            >
              <View style={styles.removeBannerInner}>
                <Icon icon="close-circle" size={24} color={theme.colors.surface} />
                <View style={styles.removeBannerText}>
                  <Text variant="bodyLarge" style={{ color: theme.colors.surface }}>
                    {t("store.removeBanner")}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.surface }}>
                    {t("store.removeBannerDescription", { price: 0.99 })}
                  </Text>
                </View>
              </View>
            </Button>
          </Card>
        ) : (
          <Card style={styles.card} mode="outlined">
            <View style={[styles.cardDivider, { backgroundColor: theme.colors.outline }]} />
            <Card.Content style={styles.bannerRemovedContent}>
              <View style={styles.bannerRemovedInner}>
                <Icon icon="check-circle" size={24} color={theme.colors.primary} />
                <Text variant="bodyMedium">{t("store.bannerRemoved")}</Text>
              </View>
            </Card.Content>
          </Card>
        )}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  adCardContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    paddingVertical: 8,
  },
  adTextContainer: {
    flex: 1,
  },
  bannerRemovedContent: {
    padding: 16,
  },
  bannerRemovedInner: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  bestValueBadge: {
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 10,
    left: 0,
    paddingHorizontal: 12,
    paddingVertical: 4,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  cardDivider: {
    height: 4,
    width: "100%",
  },
  credits: {
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerDivider: {
    height: 1,
    opacity: 0.2,
    width: "100%",
  },
  orDivider: {
    flex: 1,
    height: 2,
  },
  orDividerContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  orText: {
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    borderRadius: 16,
    justifyContent: "center",
    opacity: 0.95,
    zIndex: 1,
  },
  packageActions: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  packageCard: {
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: "hidden",
    transform: [{ scaleY: 1 }],
  },
  packageCardBest: {
    borderWidth: 2,
    transform: [{ scaleY: 1.08 }],
    zIndex: 2,
  },
  packageCardMedium: {
    borderWidth: 1,
    transform: [{ scaleY: 1.04 }],
    zIndex: 1,
  },
  packageContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    padding: 16,
  },
  packageHeader: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  packageHeaderBest: {
    paddingTop: 12,
  },
  packagePrice: {
    fontWeight: "bold",
  },
  packageTitle: {
    flex: 1,
  },
  packages: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 6,
    width: "100%",
  },
  removeBannerButton: {
    borderRadius: 16,
  },
  removeBannerContent: {
    paddingVertical: 8,
  },
  removeBannerInner: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 8,
  },
  removeBannerText: {
    flex: 1,
  },
  root: {
    flex: 1,
    minHeight: "100%",
    paddingBottom: 24,
  },
  timerContainer: {
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
  },
})
