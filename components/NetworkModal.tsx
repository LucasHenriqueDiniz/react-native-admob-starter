import { Button, Icon } from "components"
import { useAppTheme } from "hooks"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Modal, Portal, Text } from "react-native-paper"
import { useNetworkStore } from "store/useNetworkStore"

export function NetworkModal() {
  const { t } = useTranslation()
  const { theme } = useAppTheme()
  const [isChecking, setIsChecking] = useState(false)
  const {
    isConnected,
    isModalVisible,
    setModalVisible,
    checkConnection,
    startConnectionCheck,
    stopConnectionCheck,
  } = useNetworkStore()

  useEffect(() => {
    startConnectionCheck()
    return () => stopConnectionCheck()
  }, [startConnectionCheck, stopConnectionCheck])

  const handleCheckConnection = async () => {
    setIsChecking(true)
    await checkConnection()
    setIsChecking(false)
    if (!isConnected) {
      // Se ainda não estiver conectado, mostra uma mensagem de erro
      setModalVisible(true)
    } else {
      setModalVisible(false)
    }
  }

  const handleDismiss = () => {
    if (isConnected) {
      setModalVisible(false)
    }
  }

  return (
    <Portal>
      <Modal
        visible={isModalVisible}
        onDismiss={handleDismiss}
        contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.surface }]}
        dismissable={isConnected}
      >
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.error }]}>
            <Icon icon="wifi" size={32} color={theme.colors.onError} />
          </View>
          <Text variant="headlineSmall" style={styles.title}>
            {t("network.title")}
          </Text>
          <Text variant="bodyMedium" style={styles.message}>
            {t("network.message")}
          </Text>
          <Button
            variant="danger"
            onPress={handleCheckConnection}
            loading={isChecking}
            fullWidth
            style={styles.button}
          >
            {isChecking ? t("common.loading") : t("common.ok")}
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
  },

  content: {
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    marginBottom: 16,
    width: 80,
  },
  message: {
    marginTop: 8,
    textAlign: "center",
  },
  modal: {
    borderRadius: 8,
    margin: 20,
    padding: 20,
  },
  title: {
    textAlign: "center",
  },
})
