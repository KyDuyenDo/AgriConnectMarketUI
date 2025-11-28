import { View } from "react-native"

export function LocationSkeleton() {
    return (
        <View className="mb-6 px-4">
            {/* Section Title Skeleton */}
            <View className="h-6 w-48 bg-gray-200 rounded mb-4" style={{ backgroundColor: "#E5E7EB" }} />

            {/* Province Select Skeleton */}
            <View className="mb-4">
                <View className="h-4 w-20 bg-gray-200 rounded mb-2" style={{ backgroundColor: "#E5E7EB" }} />
                <View className="h-12 w-full bg-gray-200 rounded-lg" style={{ backgroundColor: "#E5E7EB" }} />
            </View>

            {/* District Select Skeleton */}
            <View className="mb-4">
                <View className="h-4 w-20 bg-gray-200 rounded mb-2" style={{ backgroundColor: "#E5E7EB" }} />
                <View className="h-12 w-full bg-gray-200 rounded-lg" style={{ backgroundColor: "#E5E7EB" }} />
            </View>

            {/* Ward Select Skeleton */}
            <View className="mb-4">
                <View className="h-4 w-20 bg-gray-200 rounded mb-2" style={{ backgroundColor: "#E5E7EB" }} />
                <View className="h-12 w-full bg-gray-200 rounded-lg" style={{ backgroundColor: "#E5E7EB" }} />
            </View>

            {/* Detailed Address Skeleton */}
            <View className="mb-4">
                <View className="h-4 w-32 bg-gray-200 rounded mb-2" style={{ backgroundColor: "#E5E7EB" }} />
                <View className="h-20 w-full bg-gray-200 rounded-lg" style={{ backgroundColor: "#E5E7EB" }} />
            </View>
        </View>
    )
}
