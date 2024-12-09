/* eslint-disable react-native/no-inline-styles */
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { BannerAdLayout } from "components/ads/BannerAdLayout"
import { Link, Tabs } from "expo-router"
import { useAppTheme } from "hooks/useAppTheme"
import { useTranslation } from "react-i18next"
import { Pressable, StyleSheet, View } from "react-native"
import { useUserStore } from "store/useUserStore"

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}) {
  return <FontAwesome size={28} style={styles.icon} {...props} />
}

export default function TabLayout() {
  const { t } = useTranslation()
  const { theme } = useAppTheme()
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)

  return (
    <BannerAdLayout>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
            tabBarStyle: {
              backgroundColor: theme.colors.surface,
            },
            headerStyle: {
              backgroundColor: theme.colors.surface,
            },
            headerTintColor: theme.colors.onSurface,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: t("tabs.home"),
              tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
              headerRight: () => (
                <Link href={isLoggedIn ? "/(auth)/profile" : "/(auth)/login"} asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name={isLoggedIn ? "user" : "user-o"}
                        size={25}
                        color={theme.colors.onSurface}
                        style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />

          <Tabs.Screen
            name="premium"
            options={{
              title: t("tabs.premium"),
              tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              title: t("tabs.settings"),
              tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
            }}
          />

          <Tabs.Screen
            name="store"
            options={{
              title: t("tabs.store"),
              tabBarIcon: ({ color }) => <TabBarIcon name="shopping-basket" color={color} />,
            }}
          />
        </Tabs>
      </View>
    </BannerAdLayout>
  )
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  icon: {
    marginBottom: -3,
  },
})
