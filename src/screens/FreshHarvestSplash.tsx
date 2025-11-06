
import { useEffect } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  useDerivedValue,
} from "react-native-reanimated"

const { width, height } = Dimensions.get("window")

export function FreshHarvestSplash() {
  const logoScale = useSharedValue(0.7)
  const logoOpacity = useSharedValue(0)
  const titleOpacity = useSharedValue(0)
  const subtitleOpacity = useSharedValue(0)
  const welcomeOpacity = useSharedValue(0)
  const descOpacity = useSharedValue(0)
  const dotsOpacity = useSharedValue(1)
  const dot1Scale = useSharedValue(0.5)
  const dot2Scale = useSharedValue(0.5)
  const dot3Scale = useSharedValue(0.5)
  const footerOpacity = useSharedValue(0)

  const orbitAngle = useSharedValue(0)

  // Floating circle animations
  const floatCircle1Y = useSharedValue(0)
  const floatCircle2Y = useSharedValue(0)
  const floatCircle3Y = useSharedValue(0)

  const icon1Position = useDerivedValue(() => {
    const orbitRadius = 85
    const angle = orbitAngle.value
    const x = orbitRadius * Math.cos(angle)
    const y = orbitRadius * Math.sin(angle)
    return { x, y }
  })

  const icon2Position = useDerivedValue(() => {
    const orbitRadius = 57
    const angle = orbitAngle.value + Math.PI // 180° phase difference
    const x = orbitRadius * Math.cos(angle)
    const y = orbitRadius * Math.sin(angle)
    return { x, y }
  })

  useEffect(() => {
    logoScale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    })
    logoOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
    })

    setTimeout(() => {
      titleOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      })
    }, 300)

    setTimeout(() => {
      subtitleOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      })
    }, 500)

    setTimeout(() => {
      welcomeOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      })
      descOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      })
    }, 700)

    setTimeout(() => {
      footerOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      })
    }, 1000)

    dot1Scale.value = withRepeat(
      withTiming(1.2, {
        duration: 600,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    )

    setTimeout(() => {
      dot2Scale.value = withRepeat(
        withTiming(1.2, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      )
    }, 150)

    setTimeout(() => {
      dot3Scale.value = withRepeat(
        withTiming(1.2, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      )
    }, 300)

    orbitAngle.value = withRepeat(
      withTiming(-Math.PI * 2, {
        duration: 7500, // Full rotation in 7.5 seconds
        easing: Easing.linear,
      }),
      -1,
      false,
    )

    floatCircle1Y.value = withRepeat(
      withTiming(-20, {
        duration: 4000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    )

    floatCircle2Y.value = withRepeat(
      withTiming(15, {
        duration: 4500,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    )

    floatCircle3Y.value = withRepeat(
      withTiming(-15, {
        duration: 5000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    )
  }, [])

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }))

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }))

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }))

  const welcomeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: welcomeOpacity.value,
  }))

  const descAnimatedStyle = useAnimatedStyle(() => ({
    opacity: descOpacity.value,
  }))

  const dot1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
  }))

  const dot2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
  }))

  const dot3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
  }))

  const circle1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatCircle1Y.value }],
  }))

  const circle2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatCircle2Y.value }],
  }))

  const circle3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatCircle3Y.value }],
  }))

  const footerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }))

  const icon1AnimatedStyle = useAnimatedStyle(() => {
    const pos = icon1Position.value
    return {
      transform: [{ translateX: pos.x }, { translateY: pos.y }],
    }
  })

  const icon2AnimatedStyle = useAnimatedStyle(() => {
    const pos = icon2Position.value
    return {
      transform: [{ translateX: pos.x }, { translateY: pos.y }],
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4CAF50", "#66BB6A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Animated.View style={[styles.floatingCircle, styles.circle1, circle1AnimatedStyle]} />
        <Animated.View style={[styles.floatingCircle, styles.circle2, circle2AnimatedStyle]} />
        <Animated.View style={[styles.floatingCircle, styles.circle3, circle3AnimatedStyle]} />

        <View style={styles.content}>
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <View style={styles.orbitContainer}>
              <Animated.View style={[styles.orbitIcon, styles.orangeIcon, icon1AnimatedStyle]}>
                <Text style={styles.orbitIconText}>🍃</Text>
              </Animated.View>

              <Animated.View style={[styles.orbitIcon, styles.lightGreenIcon, icon2AnimatedStyle]}>
                <Text style={[styles.orbitIconText, styles.wheatIconText]}>🌾</Text>
              </Animated.View>
            </View>

            <View style={styles.logoCircle}>
              {/* Sprout Icon - represented as a simple plant SVG-like shape */}
              <Text style={styles.sproutIcon}>🌱</Text>
            </View>
          </Animated.View>

          <Animated.View style={titleAnimatedStyle}>
            <Text style={styles.title}>FreshHarvest</Text>
          </Animated.View>

          <Animated.View style={subtitleAnimatedStyle}>
            <Text style={styles.subtitle}>Farm to Table Fresh</Text>
          </Animated.View>

          <Animated.View style={welcomeAnimatedStyle}>
            <Text style={styles.welcomeHeader}>Welcome to Fresh Living</Text>
          </Animated.View>

          <Animated.View style={descAnimatedStyle}>
            <Text style={styles.description}>
              Discover the freshest organic produce directly from local farms to your table
            </Text>
          </Animated.View>

          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Preparing fresh experience...</Text>
            <View style={styles.dotsContainer}>
              <Animated.View style={[styles.dot, dot1AnimatedStyle]} />
              <Animated.View style={[styles.dot, dot2AnimatedStyle]} />
              <Animated.View style={[styles.dot, dot3AnimatedStyle]} />
            </View>
          </View>
        </View>

        <Animated.View style={[styles.footer, footerAnimatedStyle]}>
          <Text style={styles.footerText}>♡ Sustainably grown, locally sourced</Text>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#43A047",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  floatingCircle: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.15,
  },
  circle1: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    top: "10%",
    left: "10%",
  },
  circle2: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    bottom: "20%",
    right: "15%",
  },
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    top: "50%",
    right: "10%",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logoContainer: {
    marginBottom: 30,
    position: "relative",
  },
  orbitContainer: {
    position: "absolute",
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  orbitIcon: {
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  orangeIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#FF9800",
  },
  lightGreenIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#81C784",
  },
  orbitIconText: {
    fontSize: 16,
  },
  wheatIconText: {
    fontSize: 12,
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
  sproutIcon: {
    fontSize: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "300",
  },
  welcomeHeader: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
    maxWidth: 280,
    fontFamily: "Poppins",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  loadingText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    opacity: 0.8,
  },
  footer: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.75)",
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "500",
  },
})
