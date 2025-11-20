import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { MapPin, ChevronRight, Clock, Zap } from "lucide-react-native"

export default function DeliveryOptionsCard() {
  const [selectedDelivery, setSelectedDelivery] = useState("express")

  return (
    <View className="px-4 mb-4">
      <View className="bg-white p-4 rounded-2xl shadow-sm">
        <Text className="text-base font-semibold text-[#2D2D2D] mb-4">Delivery Options</Text>

        {/* Address */}
        <View className="bg-[#E8F5E8] rounded-xl p-3 mb-3 flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 items-center justify-center">
              <MapPin size={20} color="#4CAF50" />
            </View>
            <View>
              <Text className="text-sm font-medium text-[#2D2D2D]">123 Main Street</Text>
              <Text className="text-xs text-[#8A8A8A]">Apartment 4B, San Francisco, CA</Text>
            </View>
          </View>
          <TouchableOpacity className="w-8 h-8 items-center justify-center">
            <ChevronRight size={18} color="#8A8A8A" />
          </TouchableOpacity>
        </View>

        {/* Standard Delivery */}
        <View className="border border-[#E8E8E8] rounded-xl p-3 mb-3 flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 items-center justify-center">
              <Clock size={20} color="#4CAF50" />
            </View>
            <View>
              <Text className="text-sm font-medium text-[#2D2D2D]">Tomorrow 2-4 PM</Text>
              <Text className="text-xs text-[#8A8A8A]">Standard delivery</Text>
            </View>
          </View>
          <TouchableOpacity className="w-8 h-8 items-center justify-center">
            <ChevronRight size={18} color="#8A8A8A" />
          </TouchableOpacity>
        </View>

        {/* Express Delivery */}
        <TouchableOpacity
          onPress={() => setSelectedDelivery("express")}
          className={`border rounded-xl p-3 flex-row justify-between items-center ${selectedDelivery === "express" ? "border-[#E8E8E8]" : "border-[#E8E8E8]"
            }`}
        >
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 items-center justify-center">
              <Zap size={20} color="#F39C12" />
            </View>
            <View>
              <Text className="text-sm font-medium text-[#2D2D2D]">Express Delivery</Text>
              <Text className="text-xs text-[#8A8A8A]">Today 6-8 PM (+$4.99)</Text>
            </View>
          </View>
          <View
            className={`w-4 h-4 rounded-full border items-center justify-center ${selectedDelivery === "express" ? "border-[#FF8C42]" : "border-[#8A8A8A]"
              }`}
          >
            {selectedDelivery === "express" && <View className="w-2.5 h-2.5 rounded-full bg-[#FF8C42]" />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
