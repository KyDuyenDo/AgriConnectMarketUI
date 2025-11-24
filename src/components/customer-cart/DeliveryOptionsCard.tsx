import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { MapPin, ChevronRight, Clock, Zap, User, Phone } from "lucide-react-native"

interface Address {
  id: string
  province: string
  district: string
  ward: string
  detail: string
  isDefault: boolean
}

interface Customer {
  id: string
  fullname: string
  phone: string
  email?: string
}

interface DeliveryOptionsCardProps {
  defaultAddress?: Address | null
  customer?: Customer | null
  onChangeAddress?: () => void
}

export default function DeliveryOptionsCard({
  defaultAddress,
  customer,
  onChangeAddress
}: DeliveryOptionsCardProps) {
  const [selectedDelivery, setSelectedDelivery] = useState("express")

  return (
    <View className="px-4 mb-4">
      <View className="bg-white p-4 rounded-2xl shadow-sm">
        <Text className="text-base font-semibold text-[#2D2D2D] mb-4">Delivery Information</Text>

        {/* Customer Info */}
        {customer && (
          <View className="bg-[#F5F5F5] rounded-xl p-3 mb-3">
            <View className="flex-row items-center gap-3 mb-2">
              <View className="w-8 h-8 items-center justify-center">
                <User size={18} color="#4CAF50" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-[#8A8A8A] mb-1">Customer Name</Text>
                <Text className="text-sm font-medium text-[#2D2D2D]">{customer.fullname}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 items-center justify-center">
                <Phone size={18} color="#4CAF50" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-[#8A8A8A] mb-1">Phone Number</Text>
                <Text className="text-sm font-medium text-[#2D2D2D]">{customer.phone}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Address */}
        <View className="bg-[#E8F5E8] rounded-xl p-3 mb-3 flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 items-center justify-center">
              <MapPin size={20} color="#4CAF50" />
            </View>
            <View>
              <Text className="text-sm font-medium text-[#2D2D2D]">{defaultAddress?.detail}</Text>
              <Text className="text-xs text-[#8A8A8A]">{defaultAddress?.ward}, {defaultAddress?.district}, {defaultAddress?.province}</Text>
            </View>
          </View>
          <TouchableOpacity className="w-8 h-8 items-center justify-center"
          onPress={onChangeAddress}
          >
            <ChevronRight size={18} color="#8A8A8A" />
          </TouchableOpacity>
        </View>

        {/* Standard Delivery */}
        {/* <View className="border border-[#E8E8E8] rounded-xl p-3 mb-3 flex-row justify-between items-center">
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
        </View> */}

        {/* Express Delivery */}
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
    </View>
  )
}
