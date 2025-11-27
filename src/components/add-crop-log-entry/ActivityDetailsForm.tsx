"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, ActivityIndicator } from "react-native"
import { Calendar, ChevronDown, X } from "lucide-react-native"
import { useEventTypes } from "@/hooks/useCareEvents"
import DateTimePicker from "@react-native-community/datetimepicker"

export const ActivityDetailsForm: React.FC<{
  onActivityTypeSelect: (typeId: string, typeName: string) => void
  onDetailsChange: (details: string) => void
  selectedDate: Date
  onDateChange: (date: Date) => void
  selectedActivityType: string | null
}> = ({ onActivityTypeSelect, onDetailsChange, selectedDate, onDateChange, selectedActivityType }) => {
  const { data: eventTypes, isLoading } = useEventTypes()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [details, setDetails] = useState("")

  const selectedActivityName = useMemo(() => {
    return eventTypes?.find((et) => et.id === selectedActivityType)?.eventTypeName || "Select activity type..."
  }, [selectedActivityType, eventTypes])

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      onDateChange(date)
      setShowDatePicker(false)
    }
  }

  const handleActivitySelect = (typeId: string, typeName: string) => {
    onActivityTypeSelect(typeId, typeName)
    setShowActivityModal(false)
  }

  const handleDetailsChange = (text: string) => {
    setDetails(text)
    onDetailsChange(text)
  }

  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
      <Text className="text-base font-semibold text-[#2D2D2D] mb-3">Activity Details</Text>

      {/* Date Picker */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-[#5C5C5C] mb-2">
          Date <Text className="text-[#E74C3C]">*</Text>
        </Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} className="relative">
          <View className="absolute left-3 top-3 z-10">
            <Calendar size={16} color="#8A8A8A" />
          </View>
          <View className="w-full bg-white border border-[#E8E8E8] rounded-xl py-3 pl-10 pr-4">
            <Text className="text-sm text-[#2D2D2D]">{selectedDate.toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={selectedDate} mode="date" display="default" onChange={handleDateChange} />
        )}
      </View>

      {/* Activity Type Dropdown */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-[#5C5C5C] mb-2">
          Activity Type <Text className="text-[#E74C3C]">*</Text>
        </Text>
        <TouchableOpacity onPress={() => setShowActivityModal(true)} className="relative">
          <View className="absolute left-3 top-3 z-10">
            <View className="w-4 h-4 bg-[#4CAF50] rounded" />
          </View>
          <View className="w-full bg-white border border-[#E8E8E8] rounded-xl py-3 pl-10 pr-4 flex-row justify-between items-center">
            <Text className={`text-sm ${selectedActivityType ? "text-[#2D2D2D]" : "text-[#8A8A8A]"}`}>
              {selectedActivityName}
            </Text>
            <ChevronDown size={16} color="#8A8A8A" />
          </View>
        </TouchableOpacity>

        {/* Activity Type Modal */}
        <Modal
          visible={showActivityModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowActivityModal(false)}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-[#2D2D2D]">Select Activity Type</Text>
                <TouchableOpacity onPress={() => setShowActivityModal(false)}>
                  <X size={24} color="#2D2D2D" />
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
              ) : (
                <FlatList
                  data={eventTypes}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleActivitySelect(item.id, item.eventTypeName)}
                      className="bg-[#F9FAF9] border border-[#E8E8E8] rounded-xl p-4 mb-3 flex-row justify-between items-center"
                    >
                      <View>
                        <Text className="text-base font-semibold text-[#2D2D2D]">{item.eventTypeName}</Text>
                        <Text className="text-xs text-[#8A8A8A] mt-1">{item.eventTypeDesc}</Text>
                      </View>
                      {selectedActivityType === item.id && <View className="w-5 h-5 bg-[#4CAF50] rounded-full" />}
                    </TouchableOpacity>
                  )}
                  scrollEnabled={false}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>

      {/* Activity Details */}
      <View>
        <Text className="text-sm font-medium text-[#5C5C5C] mb-2">
          Description <Text className="text-[#E74C3C]">*</Text>
        </Text>
        <TextInput
          className="w-full bg-white border border-[#E8E8E8] rounded-xl p-4 text-sm text-[#2D2D2D]"
          placeholder="Describe what was done..."
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          value={details}
          onChangeText={handleDetailsChange}
          style={{ height: 80 }}
        />
      </View>
    </View>
  )
}
