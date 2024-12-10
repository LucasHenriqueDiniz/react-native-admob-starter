import { Button } from "components"
import { useAppTheme } from "hooks"
import { useTranslation } from "react-i18next"
import { Image, ImageProps, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { Text } from "react-native-paper"

const sadFace = require("assets/images/sad-face.png")

interface EmptyStateProps {
  /**
   * An optional prop that specifies the text/image set to use for the empty state.
   */
  preset?: "generic"
  /**
   * Style override for the container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An Image source to be displayed above the heading.
   */
  imageSource?: ImageProps["source"]
  /**
   * Style overrides for image.
   */
  imageStyle?: StyleProp<ImageStyle>
  /**
   * Pass any additional props directly to the Image component.
   */
  ImageProps?: Omit<ImageProps, "source">
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: string
  /**
   * The content text to display if not using `contentTx`.
   */
  content?: string
  /**
   * The button text to display if not using `buttonTx`.
   */
  button?: string
  /**
   * Button props override
   */
  ButtonProps?: Omit<React.ComponentProps<typeof Button>, "children">
  /**
   * Called when the button is pressed
   */
  buttonOnPress?: () => void
}

const presets = {
  generic: {
    imageSource: sadFace,
    heading: "emptyState.generic.heading",
    content: "emptyState.generic.content",
    button: "emptyState.generic.button",
  },
}

export function EmptyState(props: EmptyStateProps) {
  const {
    preset = "generic",
    style: $containerStyleOverride,
    imageSource = presets[preset].imageSource,
    imageStyle: $imageStyleOverride,
    ImageProps,
    heading = presets[preset].heading,
    content = presets[preset].content,
    button = presets[preset].button,
    buttonOnPress,
    ButtonProps,
  } = props

  const { t } = useTranslation()
  const { isDark, theme } = useAppTheme()

  const isImagePresent = !!imageSource
  const isHeadingPresent = !!heading
  const isContentPresent = !!content
  const isButtonPresent = !!button

  return (
    <View style={[styles.container, $containerStyleOverride]}>
      {isImagePresent && (
        <Image
          source={imageSource}
          {...ImageProps}
          style={[styles.image, $imageStyleOverride]}
          tintColor={isDark ? theme.colors.surfaceVariant : undefined}
        />
      )}

      {isHeadingPresent && (
        <Text variant="headlineSmall" style={styles.heading}>
          {t(heading)}
        </Text>
      )}

      {isContentPresent && (
        <Text variant="bodyMedium" style={styles.content}>
          {t(content)}
        </Text>
      )}

      {isButtonPresent && buttonOnPress && (
        <Button variant="contained" onPress={buttonOnPress} style={styles.button} {...ButtonProps}>
          {t(button)}
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  content: {
    marginTop: 8,
    paddingHorizontal: 32,
    textAlign: "center",
  },
  heading: {
    marginTop: 16,
    paddingHorizontal: 32,
    textAlign: "center",
  },
  image: {
    alignSelf: "center",
  },
})
