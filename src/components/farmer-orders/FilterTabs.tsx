import {Pressable, Text, ScrollView } from "react-native"


interface FilterTabsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const FILTERS = ["All Orders", "Pending", "Confirmed", "Processing", "Re-order"]

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2 py-2 mx-4 bg-white flex-row gap-2 rounded-3xl">
      {FILTERS.map((filter) => (
        <Pressable
          key={filter}
          onPress={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-2xl ${activeFilter === filter ? "bg-[#4CAF50]" : "bg-white"
            }`}
        >
          <Text className={`${activeFilter === filter ? "text-white" : "text-gray-700"} font-medium text-sm`}>
            {filter}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}
