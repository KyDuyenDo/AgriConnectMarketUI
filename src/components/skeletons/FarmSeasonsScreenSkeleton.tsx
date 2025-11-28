"use client"

import { View, StatusBar, TouchableOpacity, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Animated } from "react-native"
import { useEffect, useRef } from "react"
import { ArrowLeft, Plus } from "lucide-react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { FarmStackParamList } from "@/navigation/types"

type Nav = NativeStackNavigationProp<FarmStackParamList>
type RouteParams = RouteProp<FarmStackParamList, "FarmSeasons">

const SkeletonLine = ({ width = "100%", height = 16, marginBottom = 12 }: any) => {
  const animatedOpacity = useRef(new Animated.Value(0.5)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: animatedOpacity,
        width,
        height,
        marginBottom,
      }}
      className="bg-gray-200 rounded"
    />
  )
}

const SkeletonCard = () => (
  <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
    {/* Header section with icon and title */}
    <View className="flex-row items-start justify-between mb-3">
      <View className="flex-1">
        <SkeletonLine width="70%" height={18} marginBottom={6} />
        <SkeletonLine width="90%" height={14} marginBottom={0} />
      </View>
      <SkeletonLine width={40} height={40} marginBottom={0} />
    </View>

    {/* Category and status section */}
    <View className="flex-row gap-2 mb-3">
      <SkeletonLine width="35%" height={20} marginBottom={0} />
      <SkeletonLine width="25%" height={20} marginBottom={0} />
    </View>

    {/* Stats section */}
    <View className="border-t border-gray-100 pt-3 flex-row justify-between">
      <View className="flex-1">
        <SkeletonLine width="60%" height={12} marginBottom={4} />
        <SkeletonLine width="50%" height={16} marginBottom={0} />
      </View>
      <View className="flex-1 items-end">
        <SkeletonLine width="60%" height={12} marginBottom={4} />
        <SkeletonLine width="50%" height={16} marginBottom={0} />
      </View>
    </View>
  </View>
)

export const FarmSeasonsScreenSkeleton = () => {
  const navigation = useNavigation<Nav>()
  const route = useRoute<RouteParams>()
  const { farmId } = route.params

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Farm Seasons</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddSeason", { farmId })}
          className="bg-green-500 w-8 h-8 rounded-full items-center justify-center"
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Controls/Search Skeleton */}
      <View className="px-4 py-3 bg-white border-b border-gray-100 z-10">
        <SkeletonLine width="100%" height={40} marginBottom={12} />
        <View className="flex-row justify-between items-center">
          <SkeletonLine width="30%" height={14} marginBottom={0} />
          <SkeletonLine width="25%" height={14} marginBottom={0} />
        </View>
      </View>

      {/* Cards Skeleton */}
      <View className="px-4 py-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </View>
    </SafeAreaView>
  )
}
