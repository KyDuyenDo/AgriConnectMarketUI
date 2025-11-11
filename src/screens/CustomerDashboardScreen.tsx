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
import { ScrollView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const CustomerDashboardScreen: React.FC = () => {
  const [favorites, setFavorites] = useState(favoriteProducts)

  const handleToggleFavorite = (id: string) => {
    setFavorites(favorites.map((fav) => (fav.id === id ? { ...fav, isFavorite: !fav.isFavorite } : fav)))
  }

  const cartItemsCount = cartItems.length
  const cartTotal = "$24.75"

  const actions: ActionButton[] = [
    { id: "1", label: "Shop", icon: <ShoppingBasket color="white" />, backgroundColor: "bg-[#4CAF50]", link: "Explore" },
    { id: "2", label: "Favorites", icon: <Heart color="white" />, backgroundColor: "bg-[#4CAF50]", link: "Favorites" },
    { id: "3", label: "Orders", icon: <Clock color="#4CAF50" />, backgroundColor: "bg-white", borderStyle: "border border-gray-200", link: "CustomerOrders" },
    { id: "4", label: "Nearby", icon: <Locate color="#4CAF50" />, backgroundColor: "bg-white", borderStyle: "border border-gray-200", link: "Nearby" },
  ]

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          gap: 24,
          paddingBottom: Platform.OS === "ios" ? 140 : 50,
        }}
      >
        <Header
          userName="Yung Chen"
          profileImage="https://th.bing.com/th/id/R.c791922bcc10b38abfee71c89c3fff82?rik=qNyYcWrvzrww7A&pid=ImgRaw&r=0"
          notificationCount={3}
        />
        <ActionButtonList actions={actions} />
        <YourCartCard items={cartItems} total={cartTotal} itemsCount={cartItemsCount} />
        <RecentOrdersCard orders={recentOrders} />
        <YourFavoriteCard favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        <SpecialOffersCard />
      </ScrollView>
    </SafeAreaView>
  )
}
