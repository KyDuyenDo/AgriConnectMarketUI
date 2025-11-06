import React from "react"
import {
    ScrollView,
    View,
    Text,
    TextInput,
    Pressable,
    Platform,
} from "react-native"
import { Header } from "@/components/customer-exlore/Header"
import { SearchBar } from "@/components/customer-exlore/SearchBar"
import { CardHeader } from "@/components/customer-exlore/CardHeader"
import { SafeAreaView } from "react-native-safe-area-context"

export function ExploreScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="p-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 140 : 110 }}
                showsVerticalScrollIndicator={false}
            >
                <Header />
                <SearchBar />
                <CardHeader />


                {/* Categories header */}
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-base font-semibold text-gray-800">Categories</Text>
                    <Pressable>
                        <Text className="text-sm text-green-500 font-medium">View All</Text>
                    </Pressable>
                </View>

                <View className="flex-row items-center space-x-4 mb-4">
                    {["All", "Organic", "In Stock", "Nearby", "4.5+"].map((f, idx) => (
                        <Pressable
                            key={f}
                            className={`px-3 py-2 mx-2 rounded-full ${idx === 0 ? "bg-green-500" : "bg-gray-100"}`}
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