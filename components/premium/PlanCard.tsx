import { Button } from "components"
import { useAppTheme } from "hooks"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Card, Text } from "react-native-paper"

interface Props {
  title: string
  price: string
  description: string
  onSubscribe: () => void
  featured?: boolean
}

export function PlanCard({ title, price, description, onSubscribe, featured }: Props) {
  const { theme } = useAppTheme()
  const { t } = useTranslation()

  return (
    <Card
      style={[styles.card, featured && { backgroundColor: theme.colors.primaryContainer }]}
      mode="elevated"
    >
      <Card.Content style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="titleLarge" style={styles.title}>
            {title}
          </Text>
          <Text variant="headlineMedium" style={styles.price}>
            {price}
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {description}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          variant={featured ? "contained" : "outlined"}
          onPress={onSubscribe}
          fullWidth
          icon={featured ? "check" : undefined}
        >
          {t("premium.subscribe")}
        </Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  actions: {
    paddingRight: 16,
  },
  card: {
    borderRadius: 16,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 225,
    width: "100%",
  },
  content: {
    alignItems: "center",
    flex: 1,
    height: 150,
    paddingVertical: 8,
  },
  description: {
    textAlign: "center",
  },
  price: {
    marginVertical: 8,
    textAlign: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    textAlign: "center",
  },
})
