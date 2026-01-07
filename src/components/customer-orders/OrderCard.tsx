// OrderCard.tsx
import React from "react"
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native"
import { PhoneCall, MoreHorizontal, Star } from "lucide-react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useNavigation } from "@react-navigation/native"
import theme from "@/utils/theme"
import { createCardStyle, createTextStyle, getStatusBgColor, getStatusTextColor } from "@/utils/style-helpers"

export type OrderStatus = "in_transit" | "delivered" | "pending" | "cancelled"

export type Order = {
  id: string
  code: string
  date: string
  farmName: string
  farmBanner: string
  subtitle: string
  status: OrderStatus
  total: string
  itemsCount: number
  estDelivery?: string
  deliveredDate?: string
  rating?: string
  farmId?: string
  batchId?: string
  images: string[]
}

type Nav = NativeStackNavigationProp<CustomerStackParamList>

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const navigation = useNavigation<Nav>()

  const statusBg = getStatusBgColor(order.status)
  const statusText = getStatusTextColor(order.status)
  const statusLabel = order.status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <Pressable
      onPress={() => navigation.navigate("CustomerOrderDetail", { orderId: order.id })}
      style={{
        ...createCardStyle({
          marginBottom: theme.spacing.md,
          padding: theme.spacing.md,
        }),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        opacity: order.status === "cancelled" ? 0.75 : 1,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Farm Info & Status */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.spacing.sm }}>
            {order.farmBanner && (
              <Image
                source={{ uri: order.farmBanner }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.radius.md,
                  marginRight: theme.spacing.sm,
                }}
              />
            )}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...createTextStyle("primary"),
                  fontSize: theme.fontSize.base,
                  fontWeight: theme.fontWeight.semibold,
                }}
              >
                {order.farmName}
              </Text>
              <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.sm }}>{order.code}</Text>
            </View>
          </View>

          {/* Status Badge */}
          <View
            style={{
              backgroundColor: statusBg,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 4,
              borderRadius: theme.radius.full,
              alignSelf: "flex-start",
              marginBottom: theme.spacing.sm,
            }}
          >
            <Text style={{ fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.medium, color: statusText }}>
              {statusLabel}
            </Text>
          </View>
        </View>

        {/* Menu Button */}
        <TouchableOpacity style={{ padding: theme.spacing.xs }}>
          <MoreHorizontal size={20} color={theme.colors.neutral.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Farm info */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.spacing.md }}>
        <Image
          source={{
            uri: typeof order.farmBanner === "string" ? order.farmBanner : (order.farmBanner as any)?.uri || "",
          }}
          style={{ width: 40, height: 40, borderRadius: theme.radius.md, marginRight: theme.spacing.md }}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...createTextStyle("primary"),
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.semibold,
            }}
            numberOfLines={1}
          >
            {order.farmName}
          </Text>
          <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.xs }} numberOfLines={1}>
            {order.subtitle}
          </Text>
        </View>

        {(order.status === "in_transit" || order.status === "pending") && (
          <Pressable
            style={{
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radius.md,
              backgroundColor: theme.colors.neutral.divider,
            }}
          >
            <PhoneCall size={14} color="#4CAF50" />
          </Pressable>
        )}

        {order.status === "delivered" && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.xs }}>
            <Star size={12} color="#FFA726" fill="#FFA726" />
            <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.xs }}>{order.rating}</Text>
          </View>
        )}
      </View>

      {/* Thumbnails */}
      <View style={{ flexDirection: "row", gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
        {order.images?.slice(0, 3).map((img, idx) => (
          <Image
            key={idx}
            source={{ uri: typeof img === "string" ? img : (img as any)?.uri || "" }}
            style={{
              width: 50,
              height: 50,
              borderRadius: theme.radius.md,
              backgroundColor: theme.colors.neutral.divider,
            }}
            resizeMode="cover"
          />
        ))}
        {order.itemsCount > 3 && (
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: theme.radius.md,
              backgroundColor: theme.colors.neutral.divider,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSize.xs,
                fontWeight: theme.fontWeight.semibold,
                color: theme.colors.neutral.text.secondary,
              }}
            >
              +{order.itemsCount - 3}
            </Text>
          </View>
        )}
      </View>

      {/* items + total */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: theme.spacing.md,
          borderTopWidth: 1,
          borderTopColor: theme.colors.neutral.border,
        }}
      >
        <View>
          <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.sm }}>
            {order.itemsCount} items • {order.date}
          </Text>
          {order.status === "in_transit" && order.estDelivery && (
            <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.xs }}>
              Est. delivery: {order.estDelivery}
            </Text>
          )}
          {order.status === "delivered" && order.deliveredDate && (
            <Text style={{ ...createTextStyle("success"), fontSize: theme.fontSize.xs }}>
              Delivered on {order.deliveredDate}
            </Text>
          )}
          {order.status === "pending" && (
            <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.xs }}>Awaiting confirmation</Text>
          )}
          {order.status === "cancelled" && (
            <Text style={{ ...createTextStyle("error"), fontSize: theme.fontSize.xs }}>Order cancelled</Text>
          )}
        </View>

        <Text
          style={{
            fontSize: theme.fontSize.base,
            fontWeight: theme.fontWeight.semibold,
            color: theme.colors.primary.main,
          }}
        >
          {new Intl.NumberFormat("vi-VN").format(Number(order.total || 0))} đ
        </Text>
      </View>
    </Pressable>
  )
}

const StatusBar: React.FC<{
  labels: string[]
  activeIndex: number
  activeColor: string
}> = ({ labels, activeIndex, activeColor }) => {
  const getActiveColor = (index: number) => {
    if (index === activeIndex) return activeColor === "#2C7BE5" ? "#2C7BE5" : "#FFA726"
    if (index < activeIndex) return activeColor
    return "#E8E8E8"
  }

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.spacing.sm }}>
        {labels.map((_, index) => {
          const isActive = index <= activeIndex

          return (
            <React.Fragment key={index}>
              <View
                style={{
                  height: theme.spacing.xs,
                  width: theme.spacing.xs,
                  borderRadius: theme.radius.full,
                  backgroundColor: getActiveColor(index),
                }}
              />
              {index < labels.length - 1 && (
                <View
                  style={{
                    height: theme.spacing.xxs,
                    flex: 1,
                    backgroundColor: index < activeIndex ? activeColor : "#E8E8E8",
                    width: 32,
                  }}
                />
              )}
            </React.Fragment>
          )
        })}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {labels.map((label) => (
          <Text key={label} style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.xxs }}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  )
}

export default OrderCard
