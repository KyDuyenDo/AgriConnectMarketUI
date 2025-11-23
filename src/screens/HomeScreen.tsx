import { Text, View } from "react-native"
import { HomeScreenSkeleton } from "@/components/skeletons/HomeScreenSkeleton"
import { useState, useEffect } from "react"

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <HomeScreenSkeleton />
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-gray-900">Home</Text>
      <Text className="mt-2 text-sm text-gray-600">Redirect to dashboard based on auth state</Text>
    </View>
  )
}
