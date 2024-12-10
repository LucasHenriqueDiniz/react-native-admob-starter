import { useSubscription } from "hooks"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Button } from "components"
import { Text } from "react-native-paper"
import { useAppTheme } from "hooks/useAppTheme"
import type { PurchasesPackage } from "react-native-purchases"

interface Props {
  _subscriptionIds?: string[] // unused but kept for backwards compatibility
}

export function SubscriptionList(_props: Props) {
  const { t } = useTranslation()
  const { theme } = useAppTheme()
  const { loading, error, packages, customerInfo, purchasePackage, restorePurchases } =
    useSubscription()

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {packages.map((pkg: PurchasesPackage) => (
        <View key={pkg.identifier} style={styles.subscriptionItem}>
          <Text variant="titleLarge">{pkg.product.title}</Text>
          <Text variant="bodyMedium">{pkg.product.description}</Text>
          <Text variant="titleMedium">{pkg.product.priceString}</Text>
          <Button
            variant="contained"
            onPress={() => purchasePackage(pkg)}
            disabled={customerInfo?.entitlements.active[pkg.identifier]?.isActive}
          >
            {customerInfo?.entitlements.active[pkg.identifier]
              ? t("subscription.active")
              : t("subscription.subscribe")}
          </Button>
        </View>
      ))}

      <Button variant="outlined" onPress={restorePurchases} style={styles.restoreButton}>
        {t("subscription.restore")}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  restoreButton: {
    marginTop: 16,
  },
  subscriptionItem: {
    borderRadius: 8,
    gap: 8,
    marginBottom: 16,
    padding: 16,
  },
})
