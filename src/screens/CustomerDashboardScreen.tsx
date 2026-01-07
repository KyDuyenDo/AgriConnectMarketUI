"use client"

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
import { ScrollView, Platform, View, Text, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGetProfile } from "@/hooks/useProfile"
import { useMyOrders, ORDERS_QUERY_KEYS } from "@/hooks/useMyOrders"
import { CustomerDashboardSkeleton } from "@/components/skeletons/CustomerDashboardSkeleton"
import { useNavigation } from "@react-navigation/native"
import { useState, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { CART_QUERY_KEYS } from "@/hooks/useCart"
import { PROFILE_QUERY_KEYS } from "@/hooks/useProfile"
import { FAVORITES_QUERY_KEYS } from "@/hooks/useFavoriteFarms"
import theme from "@/utils/theme"
import { normalizeBatchImages } from "@/utils/image-helper"

export const CustomerDashboardScreen: React.FC = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const { data: profile, isLoading: isProfileLoading } = useGetProfile()
  const { data: cart, isLoading: isCartLoading } = useCart()
  const { data: orders, isLoading: isOrdersLoading } = useMyOrders()
  const { data: favoriteFarms, isLoading: isFavoritesLoading } = useFavoriteFarms()

  // Unified loading state
  const isLoading = isProfileLoading || isCartLoading || isOrdersLoading || isFavoritesLoading

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.me }),
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.all }),
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.myOrders }),
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEYS.all }),
    ])
    setRefreshing(false)
  }, [queryClient])

  const allCartItems = cart?.cartItems?.flatMap((group: any) => group.items || []) || []

  const cartItems = allCartItems.map((item: any) => ({
    id: item.itemId || `${item.batchId}-0`,
    name: item.productName || "Unknown Product",
    quantity: `${Math.floor(item.quantity || 0)} ${item.units || "units"}`,
    price: `${new Intl.NumberFormat("vi-VN").format(item.itemPrice || 0)} đ`,
    image: normalizeBatchImages(item.batchImageUrls)[0] || null,
  }))

  const cartItemsCount = allCartItems.length
  const calculatedTotal = allCartItems.reduce((sum: number, item: any) => {
    const itemPrice = item.itemPrice || 0
    return sum + itemPrice
  }, 0)
  const cartTotalValue = cart?.totalPrice || calculatedTotal
  const cartTotal = `${new Intl.NumberFormat("vi-VN").format(cartTotalValue)} đ`
  const hasCartItems = cartItemsCount > 0

  const favoriteProducts = (favoriteFarms || [])
    .map((favorite: any) => ({
      id: favorite.farm?.id || favorite.id,
      name: favorite.farm?.farmName || "Unknown Farm",
      farm: favorite.farm?.address?.ward || "Unknown Location",
      price: favorite.farm?.averageRating || 0,
      unit: "farm",
      image: favorite.farm?.bannerUrl || "https://via.placeholder.com/150",
      isFavorite: true,
    }))
    .slice(0, 2)

  const actions: ActionButton[] = [
    {
      id: "1",
      label: "Shop",
      icon: <ShoppingBasket color="white" size={20} />,
      backgroundColor: theme.colors.primary.main,
      link: "Explore",
    },
    {
      id: "2",
      label: "Favorites",
      icon: <Heart color="white" size={20} />,
      backgroundColor: theme.colors.primary.main,
      link: "Favorites",
    },
    {
      id: "3",
      label: "Orders",
      icon: <Clock color={theme.colors.primary.main} size={20} />,
      backgroundColor: theme.colors.neutral.surface,
      borderStyle: `border border-[${theme.colors.neutral.border}]`,
      link: "CustomerOrders",
    },
    {
      id: "4",
      label: "Nearby",
      icon: <Locate color={theme.colors.primary.main} size={20} />,
      backgroundColor: theme.colors.neutral.surface,
      borderStyle: `border border-[${theme.colors.neutral.border}]`,
      link: "Nearby",
    },
  ]

  // Show skeleton while loading
  if (isLoading && !refreshing) {
    return <CustomerDashboardSkeleton />
  }

  const handleCheckout = () => {
    if (hasCartItems) {
      navigation.navigate("Cart" as never)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral.background }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 0,
          gap: theme.spacing.md,
          paddingBottom: Platform.OS === "ios" ? 140 : 70,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary.main]}
            tintColor={theme.colors.primary.main}
          />
        }
      >
        <View style={{ paddingTop: theme.spacing.md }}>
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
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          {hasCartItems ? (
            <YourCartCard items={cartItems} total={cartTotal} itemsCount={cartItemsCount} onCheckout={handleCheckout} />
          ) : (
            <View
              style={{
                backgroundColor: theme.colors.neutral.surface,
                borderRadius: theme.radius.lg,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.lg,
                ...theme.shadows.xs,
              }}
            >
              <View style={{ alignItems: "center", paddingVertical: theme.spacing.xxxl }}>
                <ShoppingBasket color={theme.colors.neutral.text.tertiary} size={40} />
                <Text
                  style={{
                    fontSize: theme.fontSize.sm,
                    fontWeight: theme.fontWeight.medium,
                    color: theme.colors.neutral.text.secondary,
                    marginTop: theme.spacing.md,
                  }}
                >
                  Your cart is empty
                </Text>
                <Text
                  style={{
                    fontSize: theme.fontSize.xs,
                    color: theme.colors.neutral.text.tertiary,
                    marginTop: theme.spacing.sm,
                    textAlign: "center",
                  }}
                >
                  Start shopping to add items to your cart
                </Text>
              </View>
            </View>
          )}
        </View>
        <RecentOrdersCard orders={(orders || []).slice(0, 3)} />
        {favoriteProducts.length > 0 ? (
          <YourFavoriteCard
            favorites={favoriteProducts}
            onToggleFavorite={() => { }}
            onViewAll={() => navigation.navigate("Favorites" as never)}
          />
        ) : (
          <View style={{ paddingHorizontal: theme.spacing.lg }}>
            <View
              style={{
                backgroundColor: theme.colors.neutral.surface,
                borderRadius: theme.radius.lg,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.lg,
                ...theme.shadows.xs,
              }}
            >
              <View style={{ alignItems: "center", paddingVertical: theme.spacing.xxxl }}>
                <Heart color={theme.colors.neutral.text.tertiary} size={40} />
                <Text
                  style={{
                    fontSize: theme.fontSize.sm,
                    fontWeight: theme.fontWeight.medium,
                    color: theme.colors.neutral.text.secondary,
                    marginTop: theme.spacing.md,
                  }}
                >
                  No favorite farms yet
                </Text>
                <Text
                  style={{
                    fontSize: theme.fontSize.xs,
                    color: theme.colors.neutral.text.tertiary,
                    marginTop: theme.spacing.sm,
                    textAlign: "center",
                  }}
                >
                  Explore farms and add your favorites
                </Text>
              </View>
            </View>
          </View>
        )}
        <SpecialOffersCard />
      </ScrollView>
    </SafeAreaView>
  )
}
