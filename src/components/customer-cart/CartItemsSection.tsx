import { View } from "react-native"
import { FarmCartGroupCard } from "./FarmCartGroupCard"

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
  const groupedByFarm = items.reduce((groups: Record<string, Item[]>, item) => {
    if (!groups[item.farm]) groups[item.farm] = []
    groups[item.farm].push(item)
    return groups
  }, {})

  return (
    <View className="flex gap-4">
      {Object.entries(groupedByFarm).map(([farmName, farmItems]) => (
        <FarmCartGroupCard
          key={farmName}
          farmName={farmName}
          items={farmItems}
          selectedItems={selectedItems}
          onSelectItem={onSelectItem}
        />
      ))}
    </View>
  )
}
