import type React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { CheckCircle2, Download, Upload } from "lucide-react-native"

export const ActionButtons: React.FC = () => {
  return (
    <View className="flex-row gap-3 justify-center">
      <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 bg-green-100 rounded-lg active:bg-green-200">
        <CheckCircle2 size={18} color="#15803d" />
        <Text className="text-green-700 font-semibold">Select All</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg active:bg-gray-50">
        <Download size={18} color="#4b5563" />
        <Text className="text-gray-700 font-semibold">Export</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 bg-green-100 rounded-lg active:bg-green-200">
        <Upload size={18} color="#15803d" />
        <Text className="text-green-700 font-semibold">Import CSV</Text>
      </TouchableOpacity>
    </View>
  )
}
