import { View, Pressable, Text, ScrollView } from "react-native"

interface FilterTabsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const FILTERS = ["All Orders", "Pending", "Confirmed", "Processing", "Shipped", "Delivered"]

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <View className="mb-4 px-4">
      <View className="bg-white p-1 rounded-2xl">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {FILTERS.map((filter) => (
            <Pressable
              key={filter}
              onPress={() => onFilterChange(filter)}
              className={`px-4 py-2 rounded-xl ml-1 ${activeFilter === filter ? "bg-[#4CAF50]" : "bg-transparent"
                }`}
            >
              <Text className={`${activeFilter === filter ? "text-white" : "text-[#5C5C5C]"} font-medium text-xs whitespace-nowrap`}>
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
