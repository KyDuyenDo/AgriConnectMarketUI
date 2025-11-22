import { View, Text } from "react-native"
import { CartItem } from "./CartItem"
import { Product } from "@/types"

type Props = {
  items: Product[]
  selectedItems: string[]
  onSelectItem: (id: string) => void
  onDelete: (id: string) => void
}

export default function CartItemsSection({ items, selectedItems, onSelectItem, onDelete }: Props) {
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
            id={item.id}
            key={item.id}
            image={item.image}
            name={item.name}
            farm={item.farm}
            badge={{
              label: item.status,
              color: "green",
            }}
            harvestInfo={''}
            quantity={item.quantity}
            unitPrice={item.price}
            total={(parseFloat(item.price) * item.quantity).toFixed(2)}
            unit={item.unit}
            isSelected={selectedItems.includes(item.id)}
            onSelect={onSelectItem}
            onDelete={onDelete}
            onIncrement={() => { }}
            onDecrement={() => { }}
          />
        ))}
      </View>
    </View>
  )
}
