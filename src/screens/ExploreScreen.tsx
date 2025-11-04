import React from "react"
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    Pressable,
    Platform,
} from "react-native"
import { Header } from "@/components/customer-exlore/header"

export function ExploreScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="p-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 140 : 110 }}
                showsVerticalScrollIndicator={false}
            >
                <Header />

                {/* Search */}
                <View className="mb-4">
                    <View className="flex-row items-center bg-gray-100 rounded-xl p-3">
                        <TextInput
                            className="flex-1 text-sm text-gray-700"
                            placeholder="Search fresh produce..."
                            placeholderTextColor="#9CA3AF"
                        />
                        <Pressable className="ml-3 bg-green-500 w-10 h-10 rounded-lg items-center justify-center">
                            <Text className="text-white font-bold">☰</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Hero card */}
                <View className="bg-green-500 rounded-xl p-4 mb-4 overflow-hidden">
                    <View className="self-start bg-white/20 rounded-full px-3 py-1 mb-2">
                        <Text className="text-xs text-white font-semibold">Seasonal Special</Text>
                    </View>

                    <Text className="text-white text-lg font-extrabold mb-1">Fresh Winter Harvest</Text>
                    <Text className="text-white/90 text-sm mb-3">Premium organic vegetables from local farms</Text>

                    <Pressable className="bg-white rounded-full px-4 py-2 self-start">
                        <Text className="text-green-500 font-semibold">Shop Now</Text>
                    </Pressable>
                </View>

                {/* Categories header */}
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-base font-semibold text-gray-800">Categories</Text>
                    <Pressable>
                        <Text className="text-sm text-green-500 font-medium">View All</Text>
                    </Pressable>
                </View>

                <View className="flex-row items-center space-x-3 mb-4">
                    {["All", "Organic", "In Stock", "Nearby", "4.5+"].map((f, idx) => (
                        <Pressable
                            key={f}
                            className={`px-3 py-2 rounded-full ${idx === 0 ? "bg-green-500" : "bg-gray-100"}`}
                        >
                            <Text className={`${idx === 0 ? "text-white" : "text-gray-700"} text-sm font-medium`}>{f}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Products placeholder */}
                <View className="h-64" />
            </ScrollView>
        </SafeAreaView>
    )
}