import type React from "react"
import { View, Text, Pressable, Image } from "react-native"
import { Package, ShoppingCart, Heart, Inbox } from "lucide-react-native"

interface EmptyStateProps {
  type: "cart" | "orders" | "favorites" | "search" | "products" | "custom"
  title: string
  description?: string
  actionText?: string
  onAction?: () => void
  customIcon?: React.ReactNode
  imageUrl?: string
}

const getEmptyIcon = (type: string) => {
  switch (type) {
    case "cart":
      return <ShoppingCart size={48} color="#D0D0D0" strokeWidth={1.5} />
    case "orders":
      return <Inbox size={48} color="#D0D0D0" strokeWidth={1.5} />
    case "favorites":
      return <Heart size={48} color="#D0D0D0" strokeWidth={1.5} />
    case "products":
      return <Package size={48} color="#D0D0D0" strokeWidth={1.5} />
    default:
      return <Package size={48} color="#D0D0D0" strokeWidth={1.5} />
  }
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionText,
  onAction,
  customIcon,
  imageUrl,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-4 py-8">
      <View className="mb-6">
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="w-24 h-24 mb-4" resizeMode="contain" />
        ) : (
          <View className="w-20 h-20 items-center justify-center bg-[#F5F7F5] rounded-full mb-4">
            {customIcon || getEmptyIcon(type)}
          </View>
        )}
      </View>

      <Text className="text-xl font-semibold text-[#1B1F24] text-center mb-2">{title}</Text>

      {description && <Text className="text-base text-[#6B737A] text-center mb-6">{description}</Text>}

      {actionText && onAction && (
        <Pressable onPress={onAction} className="bg-[#4CAF50] px-6 py-3 rounded-lg active:opacity-90">
          <Text className="text-white font-semibold text-base">{actionText}</Text>
        </Pressable>
      )}
    </View>
  )
}
