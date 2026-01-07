import { View, Text, Image, TouchableOpacity } from "react-native"
import { Trash2 } from "lucide-react-native"
import { normalizeImageUrl } from "@/utils/image-helper"
import theme from "@/utils/theme"
import { createCardStyle, createTextStyle } from "@/utils/style-helpers"

type CartItemProps = {
  image: string
  name: string
  farm: string
  status: string
  harvested: string
  unit: string
  price: string
  total: string
  quantity: number
  tagColor?: string
  onIncrease?: () => void
  onDecrease?: () => void
  onRemove?: () => void
}

export default function CartItemCard({
  image,
  name,
  farm,
  status,
  harvested,
  unit,
  price,
  total,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const imageUri = normalizeImageUrl(image)

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.md,
        ...createCardStyle(),
        padding: theme.spacing.md,
      }}
    >
      <Image
        source={{ uri: imageUri }}
        style={{
          width: 80,
          height: 80,
          borderRadius: theme.radius.md,
          marginRight: theme.spacing.md,
          backgroundColor: theme.colors.neutral.divider,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={2}
          style={{
            ...createTextStyle("primary"),
            fontSize: theme.fontSize.base,
            fontWeight: theme.fontWeight.semibold,
          }}
        >
          {name}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.xs, marginTop: theme.spacing.xs }}
        >
          <View
            style={{
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 2,
              borderRadius: theme.radius.full,
              backgroundColor: theme.colors.primary.light,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSize.xs,
                fontWeight: theme.fontWeight.medium,
                color: theme.colors.primary.dark,
              }}
            >
              {status}
            </Text>
          </View>
          <Text style={{ ...createTextStyle("tertiary"), fontSize: theme.fontSize.xs }}>Harvested {harvested}</Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.lg, marginTop: theme.spacing.md }}
        >
          <Text
            style={{
              color: theme.colors.primary.main,
              fontWeight: theme.fontWeight.semibold,
              textAlign: "right",
            }}
          >
            {total}
          </Text>
          <Text style={{ ...createTextStyle("secondary"), fontSize: theme.fontSize.sm }}>{price}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onRemove} style={{ marginLeft: theme.spacing.md }}>
        <View
          style={{
            backgroundColor: theme.colors.status.error + "20", // 20% opacity
            padding: theme.spacing.sm,
            borderRadius: theme.radius.full,
          }}
        >
          <Trash2 size={16} color={theme.colors.status.error} />
        </View>
      </TouchableOpacity>
    </View>
  )
}
