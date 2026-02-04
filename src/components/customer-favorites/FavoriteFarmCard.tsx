import { View, Text, Image, TouchableOpacity, Pressable } from "react-native"
import type { Farm } from "@/types"
import { Heart, Star, MapPin } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useToggleFavoriteFarm } from "@/hooks/useFavoriteFarms"
import theme from "@/utils/theme"
import { createCardStyle, createTextStyle } from "@/utils/style-helpers"

interface FavoriteFarmCardProps {
  farm: Farm
}

const FavoriteFarmCard = ({ farm }: FavoriteFarmCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>()
  const { mutateAsync: toggleFavorite, isPending } = useToggleFavoriteFarm()

  const handlePress = () => {
    navigation.navigate("FarmDetail", { farmId: farm.id })
  }

  const handleToggleFavorite = async (e: any) => {
    e.stopPropagation?.()
    await toggleFavorite(farm.id)
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        ...createCardStyle(),
        flexDirection: "row",
        overflow: "hidden",
        marginBottom: theme.spacing.md,
        height: 112, // h-28
      }}
    >
      {/* Image Section - Left side */}
      <View
        style={{
          width: 112,
          height: "100%",
          backgroundColor: theme.colors.neutral.divider,
        }}
      >
        <Image
          source={{ uri: farm.bannerUrl || "https://via.placeholder.com/150" }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      {/* Content Section - Right side */}
      <View
        style={{
          flex: 1,
          padding: theme.spacing.md,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...createTextStyle("primary"),
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.bold,
                flex: 1,
                marginRight: theme.spacing.sm,
              }}
            >
              {farm.farmName}
            </Text>

            {/* Heart Button */}
            <TouchableOpacity
              onPress={handleToggleFavorite as any}
              disabled={isPending}
              style={{
                backgroundColor: theme.colors.primary.light,
                padding: 6,
                borderRadius: theme.radius.full,
              }}
            >
              <Heart size={16} fill={theme.colors.primary.main} color={theme.colors.primary.main} />
            </TouchableOpacity>
          </View>

          {/* Location */}
          {/* <View style={{ flexDirection: "row", alignItems: "center", marginTop: theme.spacing.xs }}>
            <MapPin size={12} color={theme.colors.neutral.text.tertiary} />
            <Text
              numberOfLines={1}
              style={{
                ...createTextStyle("secondary"),
                fontSize: theme.fontSize.sm,
                marginLeft: 4,
              }}
            >
              {farm.location}
            </Text>
          </View> */}
        </View>

        {/* Rating */}
        {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Star size={14} fill={theme.colors.secondary.main} color={theme.colors.secondary.main} />
          <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.sm }}>
            {farm.averageRating?.toFixed(1) || "N/A"}
          </Text>
        </View> */}
      </View>
    </Pressable>
  )
}

export default FavoriteFarmCard
