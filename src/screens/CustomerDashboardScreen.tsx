import { type ActionButton, ActionButtonList } from "@/components/customer-dashboard/ActionButtonList"
import { Header } from "@/components/customer-dashboard/Header"
import { RecentOrdersCard } from "@/components/customer-dashboard/RecentOrdersCard"
import { SpecialOffersCard } from "@/components/customer-dashboard/SpecialOffersCard"
import { YourCartCard } from "@/components/customer-dashboard/YourCartCard"
import { YourFavoriteCard } from "@/components/customer-dashboard/YourFavoriteCard"
import { useCart } from "@/hooks/useCart"
import { useFavoriteFarms } from "@/hooks/useFavoriteFarms"
import { Clock, Heart, Locate, ShoppingBasket } from "lucide-react-native"
import type React from "react"
import { ScrollView, Platform, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGetProfile } from "@/hooks/useProfile"
import { useMyOrders } from "@/hooks/useMyOrders"
import { CustomerDashboardSkeleton } from "@/components/skeletons/CustomerDashboardSkeleton"
import { useNavigation } from "@react-navigation/native"

export const CustomerDashboardScreen: React.FC = () => {
  const navigation = useNavigation()
  const { data: profile, isLoading: isProfileLoading } = useGetProfile()
  const { data: cart, isLoading: isCartLoading } = useCart()
  const { data: orders, isLoading: isOrdersLoading } = useMyOrders()
  const { data: favoriteFarms, isLoading: isFavoritesLoading } = useFavoriteFarms()

  // Unified loading state
  const isLoading = isProfileLoading || isCartLoading || isOrdersLoading || isFavoritesLoading

  const allCartItems = cart?.cartItems?.flatMap((group: any) => group.items) || []

  const cartItems =
    allCartItems.map((item: any) => ({
      id: item.itemId,
      name: item.productName || "Unknown Product",
      quantity: `${item.quantity} ${item.units || "units"}`,
      price: `${new Intl.NumberFormat('vi-VN').format(item.itemPrice)} đ`,
      image: item.batchImageUrls?.[0] || "https://via.placeholder.com/40",
    }))

  const cartItemsCount = allCartItems.length
  const cartTotalValue = cart?.totalPrice || 0
  const cartTotal = `${new Intl.NumberFormat('vi-VN').format(cartTotalValue)} đ`
  const hasCartItems = cartItemsCount > 0

  const favoriteProducts = (favoriteFarms || []).map((favorite: any) => ({
    id: favorite.farm.id,
    name: favorite.farm.farmName || "Unknown Farm",
    farm: favorite.farm.location || "Unknown Location",
    price: favorite.farm.averageRating || 0,
    unit: "farm",
    image: favorite.farm.bannerUrl || "https://via.placeholder.com/150",
    isFavorite: true,
  })).slice(0, 2)

  const actions: ActionButton[] = [
    {
      id: "1",
      label: "Shop",
      icon: <ShoppingBasket color="white" size={20} />,
      backgroundColor: "bg-[#4CAF50]",
      link: "Explore",
    },
    {
      id: "2",
      label: "Favorites",
      icon: <Heart color="white" size={20} />,
      backgroundColor: "bg-[#4CAF50]",
      link: "Favorites",
    },
    {
      id: "3",
      label: "Orders",
      icon: <Clock color="#4CAF50" size={20} />,
      backgroundColor: "bg-[#F5F7F5]",
      borderStyle: "border border-[#E8EAEB]",
      link: "CustomerOrders",
    },
    {
      id: "4",
      label: "Nearby",
      icon: <Locate color="#4CAF50" size={20} />,
      backgroundColor: "bg-[#F5F7F5]",
      borderStyle: "border border-[#E8EAEB]",
      link: "Nearby",
    },
  ]

  // Show skeleton while loading
  if (isLoading) {
    return <CustomerDashboardSkeleton />
  }

  const handleCheckout = () => {
    if (hasCartItems) {
      navigation.navigate("Cart" as never)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 0,
          gap: 16,
          paddingBottom: Platform.OS === "ios" ? 140 : 70,
        }}
      >
        <View className="pt-4">
          <Header
            userName={profile?.fullname || "Guest"}
            profileImage={
              profile?.avatarUrl ||
              "https://static.paraflowcontent.com/public/resource/image/e0231cf3-615a-4e36-bb35-bebc6aaae5a8.jpeg"
            }
            notificationCount={3}
          />
        </View>
        <ActionButtonList actions={actions} />
        <View className="px-4">
          {hasCartItems ? (
            <YourCartCard items={cartItems} total={cartTotal} itemsCount={cartItemsCount} onCheckout={handleCheckout} />
          ) : (
            <View className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100">
              <View className="items-center py-8">
                <ShoppingBasket color="#9ca3af" size={40} />
                <Text className="text-sm font-medium text-[#6B737A] mt-3">Your cart is empty</Text>
                <Text className="text-xs text-[#9ca3af] mt-1 text-center">
                  Start shopping to add items to your cart
                </Text>
              </View>
            </View>
          )}
        </View>
        <RecentOrdersCard orders={orders || []} />
        {favoriteProducts.length > 0 ? (
          <YourFavoriteCard
            favorites={favoriteProducts}
            onToggleFavorite={() => { }}
            onViewAll={() => navigation.navigate("Favorites" as never)}
          />
        ) : (
          <View className="px-4">
            <View className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100">
              <View className="items-center py-8">
                <Heart color="#9ca3af" size={40} />
                <Text className="text-sm font-medium text-[#6B737A] mt-3">No favorite farms yet</Text>
                <Text className="text-xs text-[#9ca3af] mt-1 text-center">Explore farms and add your favorites</Text>
              </View>
            </View>
          </View>
        )}
        <SpecialOffersCard />
      </ScrollView>
    </SafeAreaView>
  )
}
