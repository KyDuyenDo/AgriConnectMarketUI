import { useState } from "react"
import { ScrollView, View, Text, Pressable, Platform, TouchableOpacity } from "react-native"
import { Header } from "@/components/customer-exlore/Header"
import { SearchBar } from "@/components/customer-exlore/SearchBar"
import { CardHeader } from "@/components/customer-exlore/CardHeader"
import { ProductCustomerGrid } from "@/components/customer-exlore/ProductCustomerGird"
import { ArrowUpDown } from "lucide-react-native"
import { FeaturedFarmers } from "@/components/customer-exlore/FeaturedFarmers"
import { SafeAreaView } from "react-native-safe-area-context"
import { exploreFarms } from "@/data/mockData"

export function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="p-4"
        contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 140 : 50 }}
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
          {["All", "Organic", "In Stock", "Nearby", "4.5+"].map((f) => (
            <Pressable
              key={f}
              className={`px-3 py-2 mx-2 rounded-full ${f === "All" ? "bg-green-500" : "bg-gray-100"}`}
            >
              <Text className={`${f === "All" ? "text-white" : "text-gray-700"} text-sm font-medium`}>{f}</Text>
            </Pressable>
          ))}
        </View>

        <View className="flex-row justify-between items-center mb-3 px-4 py-2">
          <Text className="text-xl font-semibold text-gray-800">269 products found</Text>
          <TouchableOpacity className="flex-row items-center justify-center rounded-xl border border-gray-300 bg-white p-2 shadow-sm">
            <ArrowUpDown size={15} className="ml-2" />
            <Text className="mx-2 text-lg font-semibold text-gray-700">Sort</Text>
          </TouchableOpacity>
        </View>

        <ProductCustomerGrid searchQuery={searchQuery} />

        <View className="flex-row justify-between items-center mb-3 px-4 py-2">
          <Text className="text-xl font-semibold text-gray-800">Featured Farmers</Text>
        </View>

        <FeaturedFarmers Farmers={exploreFarms} />
      </ScrollView>
    </SafeAreaView>
  )
}
