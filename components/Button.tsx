/* eslint-disable react-native/no-inline-styles */
import { useAppTheme } from "hooks/useAppTheme"
import { ActivityIndicator, Pressable, StyleProp, TextStyle, ViewStyle } from "react-native"
import { Text } from "react-native-paper"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { Icon as CustomIcon, IconTypes } from "./Icon"

export type ButtonVariant =
  | "text"
  | "outlined"
  | "contained"
  | "elevated"
  | "contained-tonal"
  | "danger"
  | "danger-outline"

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
   * Icon to display
   */
  icon?: IconTypes

  /**
   * Position of the icon
   * @default "left"
   */
  iconPosition?: "left" | "right"

  /**
   * Size of the icon
   * @default 24
   */
  iconSize?: number

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

  /**
   * Compact mode for button with less padding
   * @default false
   */
  compact?: boolean
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
  iconPosition = "left",
  iconSize = 24,
  disabled = false,
  onPress,
  uppercase = false,
  size = "medium",
  fullWidth = false,
  testID,
  contentStyle,
  compact = false,
}: ButtonProps) {
  const { theme } = useAppTheme()
  const pressAnimation = useSharedValue(0)

  // Fade animation for disabled state
  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(disabled ? 0.5 : 1, {
        duration: 200,
      }),
    }
  }, [disabled])

  // Smooth press animation style
  const animatedPressStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(pressAnimation.value ? 0.98 : 1, {
            damping: 15,
            stiffness: 300,
          }),
        },
      ],
      opacity: withTiming(
        1 - pressAnimation.value * 0.1, // Subtle opacity change
        { duration: 100 },
      ),
    }
  })

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.surfaceDisabled

    switch (variant) {
      case "contained":
        return buttonColor || theme.colors.primary
      case "outlined":
      case "text":
      case "danger-outline":
        return "transparent"
      case "contained-tonal":
        return theme.colors.secondaryContainer
      case "elevated":
        return theme.colors.surface
      case "danger":
        return theme.colors.errorContainer
      default:
        return buttonColor || theme.colors.primary
    }
  }

  const getTextColor = () => {
    if (disabled) return theme.colors.onSurfaceDisabled

    switch (variant) {
      case "contained":
        return theme.colors.onPrimary
      case "outlined":
      case "text":
        return theme.colors.primary
      case "contained-tonal":
        return theme.colors.onSecondaryContainer
      case "elevated":
        return theme.colors.primary
      case "danger":
        return "#FFFFFF"
      case "danger-outline":
        return theme.colors.error
      default:
        return textColor
    }
  }

  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      backgroundColor: getBackgroundColor(),
      paddingHorizontal: compact ? 8 : 16,
    }

    if (variant === "outlined" || variant === "danger-outline") {
      baseStyle.borderWidth = 1
      baseStyle.borderColor = disabled
        ? theme.colors.surfaceDisabled
        : variant === "danger-outline"
          ? theme.colors.error
          : theme.colors.elevation.level5
    }

    if (variant === "elevated") {
      baseStyle.elevation = 2
    }

    return baseStyle
  }

  const $buttonStyles = [
    $baseButton,
    getButtonStyle(),
    size === "small" && $smallButton,
    size === "large" && $largeButton,
    fullWidth && $fullWidth,
    style,
  ]

  const $textStyles = [
    $baseLabel,
    {
      color: getTextColor(),
      textTransform: uppercase ? ("uppercase" as const) : ("none" as const),
    },
    size === "small" && $smallLabel,
    size === "large" && $largeLabel,
    labelStyle,
  ]

  const getPressedStyle = (variant: ButtonVariant, theme: any) => {
    if (disabled) return {}

    switch (variant) {
      case "text":
        return {
          backgroundColor: theme.colors.elevation.level1,
          color: theme.colors.onSurface,
          opacity: 0.75,
        }
      case "outlined":
        return {
          backgroundColor: theme.colors.elevation.level3,
          opacity: 0.75,
          borderColor: theme.colors.primary,
        }
      case "contained":
        return {
          backgroundColor: theme.colors.primaryContainer,
        }
      case "elevated":
        return {
          backgroundColor: theme.colors.primaryContainer,
          elevation: 1,
        }
      case "contained-tonal":
        return {
          backgroundColor: theme.colors.secondaryContainer,
          opacity: 0.8,
        }
      case "danger":
        return {
          backgroundColor: "rgb(200, 55, 45)", // Slightly darker red when pressed
        }
      case "danger-outline":
        return {
          backgroundColor: `${theme.colors.notification}20`, // 20 is hex for 12% opacity
          borderColor: theme.colors.notification,
        }
      default:
        return {}
    }
  }

  return (
    <Animated.View style={[{ width: fullWidth ? "100%" : "auto" }, fadeStyle]}>
      <Pressable
        onPressIn={() => {
          pressAnimation.value = 1
        }}
        onPressOut={() => {
          pressAnimation.value = 0
        }}
        style={({ pressed }) => [
          $buttonStyles,
          getButtonStyle(),
          pressed && getPressedStyle(variant, theme),
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        testID={testID}
      >
        <Animated.View style={[$contentContainer, contentStyle, animatedPressStyle]}>
          {loading ? (
            <ActivityIndicator color={getTextColor()} />
          ) : (
            <>
              {icon && iconPosition === "left" && (
                <CustomIcon icon={icon} size={iconSize} color={getTextColor()} />
              )}
              <Text style={$textStyles as StyleProp<TextStyle>}>{children}</Text>
              {icon && iconPosition === "right" && (
                <CustomIcon icon={icon} size={iconSize} color={getTextColor()} />
              )}
            </>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  )
}

const $baseButton: ViewStyle = {
  height: 48,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 8,
  borderRadius: 24,
  width: "100%",
  overflow: "hidden",
}

const $smallButton: ViewStyle = {
  height: 36,
  paddingVertical: 4,
}

const $largeButton: ViewStyle = {
  height: 56,
  paddingHorizontal: 32,
}

const $fullWidth: ViewStyle = {
  width: "100%",
}

const $baseLabel: TextStyle = {
  fontSize: 16,
  fontWeight: "700",
  textAlign: "center",
  includeFontPadding: false,
  textAlignVertical: "center",
  flexShrink: 1,
}

const $smallLabel: TextStyle = {
  fontSize: 14,
}

const $largeLabel: TextStyle = {
  fontSize: 18,
}

const $contentContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  gap: 4,
  minWidth: 0,
  flexShrink: 1,
  paddingVertical: 0,
}
