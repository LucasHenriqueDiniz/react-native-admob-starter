/* eslint-disable react-native/no-inline-styles */
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { Button as PaperButton } from "react-native-paper"
import { IconTypes } from "./Icon"
import { useAppTheme } from "hooks/useAppTheme"

export type ButtonVariant = "text" | "outlined" | "contained" | "contained-tonal" | "elevated"

interface ButtonProps {
  /**
   * Text to display inside the button
   */
  children: React.ReactNode

  /**
   * Optional styling for the button
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional styling for button text
   */
  labelStyle?: StyleProp<TextStyle>

  /**
   * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
   * - 'text' - flat button without background or outline (low emphasis)
   * - 'outlined' - button with an outline (medium emphasis)
   * - 'contained' - button with a background color (high emphasis)
   * - 'elevated' - button with a background color and elevation
   * - 'contained-tonal' - button with a secondary background color
   */
  variant?: ButtonVariant

  /**
   * Custom text color for button
   */
  textColor?: string

  /**
   * Custom button color
   */
  buttonColor?: string

  /**
   * Whether to show a loading indicator
   */
  loading?: boolean

  /**
   * Icon to display on the left
   */
  icon?: IconTypes

  /**
   * Whether the button is disabled
   */
  disabled?: boolean

  /**
   * Function to execute on press
   */
  onPress?: () => void

  /**
   * Make the label text uppercased
   */
  uppercase?: boolean

  /**
   * Compact mode for `text` variant buttons
   */
  compact?: boolean

  /**
   * TestID for testing
   */
  testID?: string

  /**
   * Optional size variant
   * - 'small' - compact button with less padding
   * - 'medium' - default size
   * - 'large' - bigger button with more padding
   */
  size?: "small" | "medium" | "large"

  /**
   * Whether the button should take up the full width of its container
   */
  fullWidth?: boolean

  /**
   * Optional styling for the button content
   */
  contentStyle?: StyleProp<ViewStyle>
}

/**
 * A customized button component based on React Native Paper's Button.
 */
export function Button({
  children,
  style,
  labelStyle,
  variant = "contained",
  textColor,
  buttonColor,
  loading = false,
  icon,
  disabled = false,
  onPress,
  uppercase = true,
  compact = false,
  size = "medium",
  fullWidth = false,
  testID,
  contentStyle,
}: ButtonProps) {
  const { isDark, theme } = useAppTheme()

  const $buttonStyles = [
    $baseButton,
    variant === "outlined" && $outlinedButton,
    size === "small" && $smallButton,
    size === "large" && $largeButton,
    fullWidth && $fullWidth,
    disabled && $disabledButton,
    style,
  ]

  const $labelStyles = [
    $baseLabel,
    size === "small" && $smallLabel,
    size === "large" && $largeLabel,
    disabled && $disabledLabel,
    labelStyle,
  ]

  const $contentStyles = [$baseContent, contentStyle]

  return (
    <PaperButton
      mode={variant}
      style={$buttonStyles}
      labelStyle={$labelStyles}
      textColor={textColor || (variant === "contained" ? theme.colors.onPrimary : undefined)}
      buttonColor={buttonColor || theme.colors.primary}
      loading={loading}
      icon={icon}
      disabled={disabled || loading}
      onPress={onPress}
      uppercase={uppercase}
      compact={compact}
      dark={isDark}
      testID={testID}
      contentStyle={$contentStyles}
    >
      {children}
    </PaperButton>
  )
}

const $baseButton: ViewStyle = {
  borderRadius: 8,
  minHeight: 48,
  justifyContent: "center",
}

const $outlinedButton: ViewStyle = {
  borderWidth: 1,
}

const $smallButton: ViewStyle = {
  minHeight: 36,
  paddingHorizontal: 12,
}

const $largeButton: ViewStyle = {
  minHeight: 56,
  paddingHorizontal: 32,
}

const $fullWidth: ViewStyle = {
  width: "100%",
}

const $disabledButton: ViewStyle = {
  opacity: 0.5,
  backgroundColor: "#E0E0E0",
}

const $baseLabel: TextStyle = {
  fontSize: 16,
  fontWeight: "600",
  textAlign: "center",
}

const $smallLabel: TextStyle = {
  fontSize: 14,
}

const $largeLabel: TextStyle = {
  fontSize: 18,
}

const $disabledLabel: TextStyle = {
  color: "rgba(0, 0, 0, 0.38)",
}

const $baseContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}
