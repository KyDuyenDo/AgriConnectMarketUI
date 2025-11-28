import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

export function FreshHarvestSplash() {
  const logoScale = useRef(new Animated.Value(0.7)).current
  const logoOpacity = useRef(new Animated.Value(0)).current
  const titleOpacity = useRef(new Animated.Value(0)).current
  const subtitleOpacity = useRef(new Animated.Value(0)).current
  const welcomeOpacity = useRef(new Animated.Value(0)).current
  const descOpacity = useRef(new Animated.Value(0)).current
  const dotsOpacity = useRef(new Animated.Value(1)).current
  const dot1Scale = useRef(new Animated.Value(0.5)).current
  const dot2Scale = useRef(new Animated.Value(0.5)).current
  const dot3Scale = useRef(new Animated.Value(0.5)).current
  const footerOpacity = useRef(new Animated.Value(0)).current

  const orbitAngle = useRef(new Animated.Value(0)).current

  // Floating circle animations
  const floatCircle1Y = useRef(new Animated.Value(0)).current
  const floatCircle2Y = useRef(new Animated.Value(0)).current
  const floatCircle3Y = useRef(new Animated.Value(0)).current

  // Derived values for icon positions using interpolation
  const icon1TranslateX = orbitAngle.interpolate({
    inputRange: [0, Math.PI * 2],
    outputRange: [85, 85],
    extrapolate: 'extend',
  })

  const icon1TranslateY = orbitAngle.interpolate({
    inputRange: [0, Math.PI / 2, Math.PI, Math.PI * 1.5, Math.PI * 2],
    outputRange: [0, 85, 0, -85, 0],
  })

  const icon2TranslateX = orbitAngle.interpolate({
    inputRange: [0, Math.PI * 2],
    outputRange: [-57, -57],
    extrapolate: 'extend',
  })

  const icon2TranslateY = orbitAngle.interpolate({
    inputRange: [0, Math.PI / 2, Math.PI, Math.PI * 1.5, Math.PI * 2],
    outputRange: [0, -57, 0, 57, 0],
  })

  useEffect(() => {
    // Logo animations
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start()

    // Sequential fade-in animations
    setTimeout(() => {
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start()
    }, 300)

    setTimeout(() => {
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start()
    }, 500)

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(welcomeOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(descOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start()
    }, 700)

    setTimeout(() => {
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start()
    }, 1000)

    // Dot scale animations (repeating)
    Animated.loop(
      Animated.timing(dot1Scale, {
        toValue: 1.2,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start()

    setTimeout(() => {
      Animated.loop(
        Animated.timing(dot2Scale, {
          toValue: 1.2,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ).start()
    }, 150)

    setTimeout(() => {
      Animated.loop(
        Animated.timing(dot3Scale, {
          toValue: 1.2,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ).start()
    }, 300)

    // Orbit animation
    Animated.loop(
      Animated.timing(orbitAngle, {
        toValue: Math.PI * 2,
        duration: 7500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()

    // Floating circle animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatCircle1Y, {
          toValue: -20,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatCircle1Y, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatCircle2Y, {
          toValue: 15,
          duration: 4500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatCircle2Y, {
          toValue: 0,
          duration: 4500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatCircle3Y, {
          toValue: -15,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatCircle3Y, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4CAF50", "#66BB6A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Animated.View style={[styles.floatingCircle, styles.circle1, { transform: [{ translateY: floatCircle1Y }] }]} />
        <Animated.View style={[styles.floatingCircle, styles.circle2, { transform: [{ translateY: floatCircle2Y }] }]} />
        <Animated.View style={[styles.floatingCircle, styles.circle3, { transform: [{ translateY: floatCircle3Y }] }]} />

        <View style={styles.content}>
          <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }], opacity: logoOpacity }]}>
            <View style={styles.orbitContainer}>
              <Animated.View style={[styles.orbitIcon, styles.orangeIcon, { transform: [{ translateX: icon1TranslateX }, { translateY: icon1TranslateY }] }]}>
                <Text style={styles.orbitIconText}>🍃</Text>
              </Animated.View>

              <Animated.View style={[styles.orbitIcon, styles.lightGreenIcon, { transform: [{ translateX: icon2TranslateX }, { translateY: icon2TranslateY }] }]}>
                <Text style={[styles.orbitIconText, styles.wheatIconText]}>🌾</Text>
              </Animated.View>
            </View>

            <View style={styles.logoCircle}>
              {/* Sprout Icon - represented as a simple plant SVG-like shape */}
              <Text style={styles.sproutIcon}>🌱</Text>
            </View>
          </Animated.View>

          <Animated.View style={{ opacity: titleOpacity }}>
            <Text style={styles.title}>FreshHarvest</Text>
          </Animated.View>

          <Animated.View style={{ opacity: subtitleOpacity }}>
            <Text style={styles.subtitle}>Farm to Table Fresh</Text>
          </Animated.View>

          <Animated.View style={{ opacity: welcomeOpacity }}>
            <Text style={styles.welcomeHeader}>Welcome to Fresh Living</Text>
          </Animated.View>

          <Animated.View style={{ opacity: descOpacity }}>
            <Text style={styles.description}>
              Discover the freshest organic produce directly from local farms to your table
            </Text>
          </Animated.View>

          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Preparing fresh experience...</Text>
            <View style={styles.dotsContainer}>
              <Animated.View style={[styles.dot, { transform: [{ scale: dot1Scale }] }]} />
              <Animated.View style={[styles.dot, { transform: [{ scale: dot2Scale }] }]} />
              <Animated.View style={[styles.dot, { transform: [{ scale: dot3Scale }] }]} />
            </View>
          </View>
        </View>

        <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
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
