import type React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { CheckSquare, Upload, Upload as UploadIcon } from "lucide-react-native"

export const ActionButtons: React.FC = () => {
  return (
    <View className="bg-white p-4 rounded-2xl flex-row justify-between shadow-sm">
      <View className="flex-row items-center gap-3">
        <TouchableOpacity className="flex-row items-center py-2 px-3 bg-[#C8E6C9] rounded-lg active:bg-green-200">
          <View className="flex items-center justify-center w-4 h-4 mr-2">
            <CheckSquare size={14} color="#2E7D32" />
          </View>
          <Text className="text-xs font-medium text-[#2E7D32]">Select All</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-2 px-3 bg-white border border-[#E8E8E8] rounded-lg active:bg-gray-50">
          <View className="flex items-center justify-center w-4 h-4 mr-2">
            <Upload size={14} color="#5C5C5C" />
          </View>
          <Text className="text-xs font-medium text-[#5C5C5C]">Export</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="flex-row items-center py-2 px-3 bg-[#C8E6C9] rounded-lg active:bg-green-200">
        <View className="flex items-center justify-center w-4 h-4 mr-2">
          <UploadIcon size={14} color="#2E7D32" />
        </View>
        <Text className="text-xs font-medium text-[#2E7D32]">Import CSV</Text>
      </TouchableOpacity>
    </View>
  )
}
