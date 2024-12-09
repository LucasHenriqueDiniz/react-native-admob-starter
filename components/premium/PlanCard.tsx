import { useTranslation } from "react-i18next"
import { StyleSheet } from "react-native"
import { Card, Button, Text, useTheme } from "react-native-paper"

interface Props {
  title: string
  price: string
  description: string
  onSubscribe: () => void
  featured?: boolean
}

export function PlanCard({ title, price, description, onSubscribe, featured }: Props) {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Card
      style={[styles.card, featured && { backgroundColor: theme.colors.primaryContainer }]}
      mode="elevated"
    >
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="headlineMedium" style={styles.price}>
          {price}
        </Text>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode={featured ? "contained" : "outlined"}
          onPress={onSubscribe}
          style={styles.button}
        >
          {t("premium.subscribe")}
        </Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    width: "100%",
  },
  card: {
    alignItems: "center",
    borderRadius: 16,
    height: 225,
    justifyContent: "center",
    paddingHorizontal: 12,
    width: "100%",
  },
  price: {
    marginVertical: 8,
  },
})
