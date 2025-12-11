import { View, Text } from "react-native"
import { CartItem } from "./CartItem"
import { Store, Truck } from "lucide-react-native"

type Props = {
  items: any[]
  selectedItems: string[]
  onSelectItem: (id: string) => void
  onDelete: (id: string) => void
  onQuantityChange?: (itemId: string, newQuantity: number) => void
  hideQuantityControls?: boolean
  farmName?: string
  shippingFee?: number
  isCalculatingShipping?: boolean
}

export default function CartItemsSection({
  items,
  selectedItems,
  onSelectItem,
  onDelete,
  onQuantityChange,
  hideQuantityControls,
  farmName,
  shippingFee,
  isCalculatingShipping,
}: Props) {
  return (
    <View className="px-4 mb-4">
      <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <View className="flex-row justify-between items-center mb-4 border-b border-gray-100 pb-3">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center">
              <Store size={20} color="#4CAF50" />
            </View>
            <View>
              <Text className="text-base font-bold text-[#2D2D2D]">{farmName || "Cart Items"}</Text>
              <Text className="text-xs text-gray-500">{items.length} items</Text>
            </View>
          </View>

          {shippingFee !== undefined && (
            <View className="bg-blue-50 px-3 py-1.5 rounded-full flex-row items-center gap-1.5">
              <Truck size={14} color="#3B82F6" />
              <Text className="text-xs font-semibold text-blue-600">
                {isCalculatingShipping ? "..." : `${new Intl.NumberFormat('vi-VN').format(shippingFee)} đ`}
              </Text>
            </View>
          )}
        </View>

        {items.map((item) => (
          <CartItem
            id={item.id}
            key={item.id}
            image={item.image}
            name={item.name}
            farm={item.farm}
            badge={{
              label: item.isOutOfStock ? "Out of Stock" : item.status,
              color: item.isOutOfStock ? "red" : "green",
            }}
            isOutOfStock={item.isOutOfStock}
            harvestInfo={""}
            quantity={item.quantity}
            unitPrice={new Intl.NumberFormat('vi-VN').format(Number.parseFloat(item.batchPrice))}
            total={new Intl.NumberFormat('vi-VN').format(Number.parseFloat(item.batchPrice) * item.quantity)}
            unit={item.unit}
            maxQuantity={100}
            isSelected={selectedItems.includes(item.id)}
            onSelect={onSelectItem}
            onDelete={onDelete}
            onIncrement={() => onQuantityChange?.(item.id, item.quantity + 1)}
            onDecrement={() => onQuantityChange?.(item.id, Math.max(1, item.quantity - 1))}
            onQuantityChange={(newQuantity) => onQuantityChange?.(item.id, newQuantity)}
            hideQuantityControls={hideQuantityControls}
          />
        ))}
      </View>
    </View>
  )
}
