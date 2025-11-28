"use client"

import type React from "react"
import { Animated } from "react-native"
import { useEffect, useRef } from "react"

interface BaseSkeletonProps {
  width?: number | string
  height: number
  borderRadius?: number
  style?: any
  animated?: boolean
}

export const BaseSkeleton: React.FC<BaseSkeletonProps> = ({
  width = "100%",
  height,
  borderRadius = 8,
  style,
  animated = true,
}) => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    }
  }, [fadeAnim, animated])

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#E8EAEB",
          opacity: animated ? fadeAnim : 1,
        },
        style,
      ]}
    />
  )
}
