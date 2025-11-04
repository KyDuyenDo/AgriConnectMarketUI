import { View, Text } from "react-native"

interface StatCardProps {
  label: string
  value: string
  change?: string
  badge?: string
  bgColor: string
  textColor: string
}

export function StatCard({ label, value, change, badge, bgColor, textColor }: StatCardProps) {
  return (
    <View className={`${bgColor} rounded-lg p-4 flex-1 m-2`}>
      <Text className={`${textColor} text-xs mb-2`}>{label}</Text>
      <View className="flex-row justify-between items-end">
        <Text className={`${textColor} text-2xl font-bold`}>{value}</Text>
        {change && <Text className={`${textColor} text-xs font-semibold`}>{change}</Text>}
        {badge && (
          <View className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
            <Text className="text-white text-xs font-bold">{badge}</Text>
          </View>
        )}
      </View>
    </View>
  )
}
