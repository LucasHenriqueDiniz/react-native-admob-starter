import { Screen } from "components/Screen"
import { router } from "expo-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Avatar, Button, Divider, List, Text } from "react-native-paper"
import { useUserStore } from "store/useUserStore"

export default function ProfileScreen() {
  const { t } = useTranslation()
  const { profile, credits, logout } = useUserStore()

  const handleLogout = () => {
    logout()
    router.back()
  }

  if (!profile) return null

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

        <List.Section>
          <List.Item
            title={t("profile.credits")}
            description={credits}
            left={(props) => <List.Icon {...props} icon="wallet" />}
          />
          {/* Adicione mais itens de lista conforme necessário */}
        </List.Section>

        <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton}>
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
