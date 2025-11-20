import { ActionButton, ActionButtonList } from "@/components/customer-dashboard/ActionButtonList"
import { Header } from "@/components/customer-dashboard/Header"
import { RecentOrdersCard } from "@/components/customer-dashboard/RecentOrdersCard"
import { SpecialOffersCard } from "@/components/customer-dashboard/SpecialOffersCard"
import { YourCartCard } from "@/components/customer-dashboard/YourCartCard"
import { YourFavoriteCard } from "@/components/customer-dashboard/YourFavoriteCard"
import { cartItems, recentOrders, favoriteProducts } from "@/data/mockData"
import { Clock, Heart, Locate, ShoppingBasket } from "lucide-react-native"
import type React from "react"
import { useState } from "react"
import { ScrollView, Platform, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const CustomerDashboardScreen: React.FC = () => {
  const [favorites, setFavorites] = useState(favoriteProducts)

  const handleToggleFavorite = (id: string) => {
    setFavorites(favorites.map((fav) => (fav.id === id ? { ...fav, isFavorite: !fav.isFavorite } : fav)))
  }

  const cartItemsCount = cartItems.length
  const cartTotal = "$24.75"

  const actions: ActionButton[] = [
    { id: "1", label: "Shop", icon: <ShoppingBasket color="white" size={20} />, backgroundColor: "bg-[#4CAF50]", link: "Explore" },
    { id: "2", label: "Favorites", icon: <Heart color="white" size={20} />, backgroundColor: "bg-[#4CAF50]", link: "Favorites" },
    { id: "3", label: "Orders", icon: <Clock color="#4CAF50" size={20} />, backgroundColor: "bg-[#F5F7F5]", borderStyle: "border border-[#E8EAEB]", link: "CustomerOrders" },
    { id: "4", label: "Nearby", icon: <Locate color="#4CAF50" size={20} />, backgroundColor: "bg-[#F5F7F5]", borderStyle: "border border-[#E8EAEB]", link: "Nearby" },
  ]

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 0,
          gap: 16,
          paddingBottom: Platform.OS === "ios" ? 140 : 50,
        }}
      >
        <View className="pt-4">
          <Header
            userName="Sarah Chen"
            profileImage="https://static.paraflowcontent.com/public/resource/image/e0231cf3-615a-4e36-bb35-bebc6aaae5a8.jpeg"
            notificationCount={3}
          />
        </View>
        <ActionButtonList actions={actions} />
        <View className="px-4">
          <YourCartCard items={cartItems} total={cartTotal} itemsCount={cartItemsCount} />
        </View>
        <RecentOrdersCard orders={recentOrders} />
        <YourFavoriteCard favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        <SpecialOffersCard />
      </ScrollView>
    </SafeAreaView>
  )
}
