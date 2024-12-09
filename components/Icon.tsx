import { ComponentType } from "react"
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useAppTheme } from "utils/useAppTheme"

// Definindo os tipos de ícones disponíveis do FontAwesome
export type IconTypes = React.ComponentProps<typeof FontAwesome>["name"]

interface IconProps extends Omit<TouchableOpacityProps, "style"> {
  /**
   * The name of the icon from FontAwesome
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon
   */
  size?: number

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

export function Icon(props: IconProps) {
  const { icon, color, size = 24, containerStyle: $containerStyleOverride, ...WrapperProps } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = (WrapperProps?.onPress ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >

  const { theme } = useAppTheme()

  return (
    <Wrapper
      accessibilityRole={isPressable ? "button" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <FontAwesome name={icon} size={size} color={color ?? theme.colors.text} />
    </Wrapper>
  )
}
