import { View, Image, TouchableOpacity, Text, Pressable } from "react-native"
import { Star, Plus, Heart } from "lucide-react-native"
import theme from "@/utils/theme"
import { createCardStyle, createTextStyle, createHeadingStyle } from "@/utils/style-helpers"

interface ProductCardProps {
  product: {
    id: string
    name: string
    farm: string
    price: string
    units: string
    sold: string
    soldAmount: string
    image: string
    category: string
  }
}

export const ProductCustomer = ({ product }: ProductCardProps) => {
  return (
    <View
      style={{
        ...createCardStyle({
          overflow: "hidden",
          marginBottom: theme.spacing.md,
        }),
        borderRadius: theme.radius.lg,
      }}
    >
      {/* Product Image */}
      <View
        style={{
          height: 160,
          width: "100%",
          backgroundColor: theme.colors.neutral.divider,
          overflow: "hidden",
          borderRadius: theme.radius.md,
          margin: theme.spacing.md,
          marginBottom: theme.spacing.sm,
        }}
      >
        <Image source={{ uri: product.image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />

        {/* Category Badge */}
        <View
          style={{
            position: "absolute",
            top: theme.spacing.md,
            left: theme.spacing.md,
            backgroundColor: theme.colors.neutral.surface + "95",
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 4,
            borderRadius: theme.radius.full,
          }}
        >
          <Text
            style={{
              fontSize: theme.fontSize.xs,
              fontWeight: theme.fontWeight.medium,
              color: theme.colors.neutral.text.secondary,
            }}
          >
            {product.category}
          </Text>
        </View>

        {/* Heart Icon */}
        <Pressable
          style={{
            position: "absolute",
            top: theme.spacing.md,
            right: theme.spacing.md,
            backgroundColor: theme.colors.neutral.surface + "95",
            borderRadius: theme.radius.full,
            padding: 6,
          }}
        >
          <Heart color={theme.colors.neutral.text.tertiary} size={18} strokeWidth={2} />
        </Pressable>
      </View>

      {/* Content */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.md,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        {/* Product Info */}
        <View>
          <Text
            style={{
              ...createHeadingStyle("h3"),
              marginBottom: theme.spacing.xs,
            }}
          >
            {product.name}
          </Text>
          <Text
            style={{
              ...createTextStyle("secondary"),
              fontSize: theme.fontSize.sm,
              marginBottom: theme.spacing.md,
            }}
          >
            {product.farm}
          </Text>

          {/* Rating & Sales */}
          <View style={{ marginTop: theme.spacing.sm }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: theme.spacing.xs,
              }}
            >
              <Star size={14} color={theme.colors.secondary.main} fill={theme.colors.secondary.main} />
              <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.xs, marginLeft: 4 }}>
                4.8(5)
              </Text>
              <Text style={{ ...createTextStyle("tertiary"), fontSize: theme.fontSize.xs, marginHorizontal: 4 }}>
                •
              </Text>
              <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.xs }}>{product.soldAmount}</Text>
            </View>
          </View>
        </View>

        {/* Price & Action */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing.md,
          }}
        >
          <Text
            style={{
              fontSize: theme.fontSize.lg,
              fontWeight: theme.fontWeight.bold,
              color: theme.colors.primary.main,
            }}
          >
            {product.price}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary.main,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.radius.md,
            }}
          >
            <Plus size={18} color={theme.colors.neutral.surface} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
