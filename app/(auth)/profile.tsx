import { Button, ListView, Screen } from "components"
import { router } from "expo-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Avatar, Divider, List, Text } from "react-native-paper"
import { useUserStore } from "store/useUserStore"
import { useSubscription } from "hooks"

export default function ProfileScreen() {
  const { t } = useTranslation()
  const { profile, credits, logout } = useUserStore()
  const { customerInfo } = useSubscription()

  const handleLogout = () => {
    logout()
    router.back()
  }

  if (!profile) return router.push("/(auth)/login")

  const activePlan = customerInfo?.entitlements.active.premium
  const planName = activePlan?.isActive
    ? activePlan.productIdentifier.includes("yearly")
      ? t("subscription.yearly")
      : t("subscription.monthly")
    : t("profile.noPlan")

  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar.Text size={80} label={profile.name[0]} />
          <Text variant="headlineSmall" style={styles.name}>
            {profile.name}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {profile.email}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <ListView
          data={[
            {
              title: t("profile.credits"),
              description: credits,
              icon: "wallet",
              onPress: () => {
                router.push("/(tabs)/store")
              },
            },
            {
              title: t("profile.currentPlan"),
              description: planName,
              icon: "crown",
              onPress: () => {
                router.push("/(tabs)/premium")
              },
            },
          ]}
          renderItem={({ item }) => (
            <List.Item
              title={item.title}
              description={item.description}
              left={(props) => <List.Icon {...props} icon={item.icon} />}
              onPress={item.onPress}
            />
          )}
          estimatedItemSize={100}
          keyExtractor={(item) => item.title}
        />

        <Button variant="outlined" onPress={handleLogout} style={styles.logoutButton}>
          {t("profile.logout")}
        </Button>
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
    marginVertical: 24,
  },
  email: {
    opacity: 0.7,
  },
  header: {
    alignItems: "center",
    gap: 8,
  },
  logoutButton: {
    marginTop: 24,
  },
  name: {
    marginTop: 8,
  },
})
