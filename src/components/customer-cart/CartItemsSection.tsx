import { View, Text } from "react-native"
import { CartItem } from "./CartItem"

type Item = {
  id: string
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
}

type Props = {
  items: Item[]
  selectedItems: string[]
  onSelectItem: (id: string) => void
}

export default function CartItemsSection({ items, selectedItems, onSelectItem }: Props) {
  return (
    <View className="px-4 mb-4">
      <View className="bg-white p-4 rounded-2xl shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-base font-semibold text-[#2D2D2D]">Cart Items</Text>
          <View className="bg-[#C8E6C9] px-3 py-1.5 rounded-full">
            <Text className="text-xs font-medium text-[#2E7D32]">{items.length} items</Text>
          </View>
        </View>

        {items.map((item) => (
          <CartItem
            key={item.id}
            image={item.image}
            name={item.name}
            farm={item.farm}
            badge={{
              label: item.status,
              color: item.tagColor === "green" ? "green" : "orange",
            }}
            harvestInfo={item.harvested}
            quantity={item.quantity}
            unitPrice={item.price}
            total={item.total.replace("$", "")}
            unit={item.unit}
            onDelete={() => { }}
            onIncrement={() => { }}
            onDecrement={() => { }}
          />
        ))}
      </View>
    </View>
  )
}
