import type React from "react"
import { View } from "react-native"

interface SkeletonLoaderProps {
  width?: number | string
  height?: number
  borderRadius?: number
  style?: any
}

const SkeletonPulse: React.FC<SkeletonLoaderProps> = ({ width = "100%", height = 16, borderRadius = 8, style }) => {
  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#E8EAEB",
          overflow: "hidden",
        },
        style,
      ]}
      className="opacity-60"
    >
      {/* Shimmer animation via CSS/Tailwind */}
      <View
        className="animate-pulse bg-gradient-to-r from-[#E8EAEB] via-[#F5F7F5] to-[#E8EAEB]"
        style={{
          flex: 1,
        }}
      />
    </View>
  )
}

export { SkeletonPulse as SkeletonLoader }
