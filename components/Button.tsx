import { StyleSheet } from "react-native"
import { Button as PaperButton, ButtonProps } from "react-native-paper"

interface CustomButtonProps extends ButtonProps {
  fullWidth?: boolean
}

export function Button({ style, contentStyle, fullWidth, ...rest }: CustomButtonProps) {
  return (
    <PaperButton
      mode="contained"
      style={[styles.button, fullWidth && styles.fullWidth, style]}
      contentStyle={[styles.content, contentStyle]}
      textColor="white"
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
  },
  content: {
    height: 48,
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: "100%",
  },
})
