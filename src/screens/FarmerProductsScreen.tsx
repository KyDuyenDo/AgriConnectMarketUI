import { ActionButtons } from "@/components/farmer-products/ActionButtons"
import { FilterSection } from "@/components/farmer-products/FilterSection"
import { Header } from "@/components/farmer-products/Header"
import { ProductGrid } from "@/components/farmer-products/ProductGrid"
import type React from "react"
import { useState } from "react"
import { View, ScrollView, Platform, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Plus } from "lucide-react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { FarmStackParamList } from "@/navigation/FarmNavigator"
import { useNavigation } from "@react-navigation/native"


type Nav = NativeStackNavigationProp<FarmStackParamList>

export interface Product {
  id: string
  name: string
  category: string
  price: string
  units: string
  sold: string
  soldAmount: string
  stock: "In Stock" | "Low Stock" | "Out of Stock"
  isFavorite: boolean
  image: string
}

export const FarmerProductsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPrice, setSelectedPrice] = useState("")
  const [selectedStock, setSelectedStock] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const navigation = useNavigation<Nav>()


  const products: Product[] = [
    {
      id: "1",
      name: "Organic Tomatoes",
      category: "Vegetables",
      price: "$8.50/kg",
      units: "45 units",
      sold: "12 units",
      soldAmount: "$102.00",
      stock: "In Stock" as const,
      isFavorite: false,
      image: "https://static.paraflowcontent.com/public/resource/image/9d94c893-ad9b-4a0e-8464-b55d85ca0b66.jpeg",
    },
    {
      id: "2",
      name: "Fresh Lettuce",
      category: "Vegetables",
      price: "$6.00/kg",
      units: "8 units",
      sold: "8 units",
      soldAmount: "$48.00",
      stock: "Low Stock" as const,
      isFavorite: true,
      image: "https://static.paraflowcontent.com/public/resource/image/b920e650-0e60-42b8-b8a0-1ba5e755a665.jpeg",
    },
    {
      id: "3",
      name: "Fresh Carrots",
      category: "Vegetables",
      price: "$4.50/kg",
      units: "32 units",
      sold: "15 units",
      soldAmount: "$67.50",
      stock: "In Stock" as const,
      isFavorite: false,
      image: "https://static.paraflowcontent.com/public/resource/image/83b6d396-0ca0-4cf0-8069-b4f92904ea76.jpeg",
    },
    {
      id: "4",
      name: "Fresh Strawberries",
      category: "Fruits",
      price: "$12.00/kg",
      units: "0 units",
      sold: "25 units",
      soldAmount: "$300.00",
      stock: "Out of Stock" as const,
      isFavorite: true,
      image: "https://static.paraflowcontent.com/public/resource/image/5616216d-9fef-4929-abf2-527191aedca7.jpeg",
    },
    {
      id: "5",
      name: "Fresh Broccoli",
      category: "Vegetables",
      price: "$7.50/kg",
      units: "28 units",
      sold: "18 units",
      soldAmount: "$135.00",
      stock: "In Stock" as const,
      isFavorite: false,
      image: "https://static.paraflowcontent.com/public/resource/image/05a73aba-8be9-4b6c-af37-f29f464a36b4.jpeg",
    },
    {
      id: "6",
      name: "Sweet Corn",
      category: "Grains",
      price: "$3.50/pc",
      units: "5 units",
      sold: "22 units",
      soldAmount: "$77.00",
      stock: "Low Stock" as const,
      isFavorite: false,
      image: "https://static.paraflowcontent.com/public/resource/image/c39b771b-0a3d-4f29-9c13-c86ff29bbe17.jpeg",
    },
  ]

  const onEdit = (productId: string) => {
    navigation.navigate("EditProduct", { productId })
  }

  const onDelete = (productId: string) => {
    console.log("Delete product:", productId)
  }

  const onView = (productId: string) => {
    navigation.navigate("FarmProductDetailReviews", { productId })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAF9" }} edges={['top']}>
      {/* Fixed Header */}
      <View className="bg-[#F9FAF9] fixed top-0 w-full z-10">
        <Header />
      </View>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          paddingBottom: Platform.OS === "ios" ? 140 : 80,
        }}
      >
        {/* Filter Section */}
        <View className="mb-4">
          <FilterSection
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPrice={selectedPrice}
            onPriceChange={setSelectedPrice}
            selectedStock={selectedStock}
            onStockChange={setSelectedStock}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </View>

        {/* Action Buttons */}
        <View className="mb-4">
          <ActionButtons />
        </View>

        {/* Product Grid */}
        <ProductGrid products={products} searchQuery={searchQuery} onEdit={onEdit} onDelete={onDelete} onView={onView} />
      </ScrollView>
      <View className="h-24" />

      {/* Floating Action Button */}
      <View className="absolute bottom-28 right-0 flex-col items-end gap-4 pr-6 pb-6">
        <TouchableOpacity
          className="bg-[#4CAF50] rounded-full w-12 h-12 flex items-center justify-center active:bg-green-600"
          style={{
            shadowColor: "#4CAF50",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
