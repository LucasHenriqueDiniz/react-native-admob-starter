import { StyleSheet, Dimensions, View } from "react-native"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated"
import { PlanCard } from "./PlanCard"
import { useTheme } from "react-native-paper"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
// const CARD_WIDTH = SCREEN_WIDTH * 0.85;
// const CARD_SPACING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

interface Plan {
  title: string
  price: string
  description: string
  featured?: boolean
}

interface Props {
  plans: Plan[]
  onSubscribe: (index: number) => void
}

const Dot = ({ index, scrollX }: { index: number; scrollX: SharedValue<number> }) => {
  const theme = useTheme()

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0.5, 1, 0.5],
    )
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0.8, 1.2, 0.8],
    )
    return {
      opacity,
      transform: [{ scale }],
    }
  })

  return (
    <Animated.View style={[styles.dot, animatedStyle, { backgroundColor: theme.colors.primary }]} />
  )
}

export function PlansCarousel({ plans, onSubscribe }: Props) {
  const scrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  return (
    <View style={styles.wrapper}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {plans.map((plan, index) => (
          <View key={plan.title} style={styles.cardContainer}>
            <View style={styles.cardWrapper}>
              <PlanCard {...plan} onSubscribe={() => onSubscribe(index)} />
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.paginationContainer}>
        {plans.map((_, index) => (
          <Dot key={index} index={index} scrollX={scrollX} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
  },
  cardWrapper: {
    width: SCREEN_WIDTH * 0.85,
  },
  dot: {
    borderRadius: 4,
    height: 8,
    marginHorizontal: 4,
    width: 8,
  },
  paginationContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  wrapper: {
    paddingVertical: 12,
    width: SCREEN_WIDTH,
  },
})
