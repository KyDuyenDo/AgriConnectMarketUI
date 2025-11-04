import { View, Pressable, Text } from "react-native"

interface FilterTabsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const FILTERS = ["All Orders", "Pending", "Confirmed", "Processing"]

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <View className="px-4 py-4 bg-white border-b border-gray-200 flex-row gap-2">
      {FILTERS.map((filter) => (
        <Pressable
          key={filter}
          onPress={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg ${
            activeFilter === filter ? "bg-green-500" : "bg-white border border-gray-200"
          }`}
        >
          <Text className={`${activeFilter === filter ? "text-white" : "text-gray-700"} font-medium text-sm`}>
            {filter}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}
