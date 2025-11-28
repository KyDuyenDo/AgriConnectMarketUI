"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { ChevronLeft } from "lucide-react-native"
import { QuickTemplates } from "../components/add-crop-log-entry/QuickTemplates"
import { ActivityDetailsForm } from "../components/add-crop-log-entry/ActivityDetailsForm"
import { SafeAreaView } from "react-native-safe-area-context"
import { useCreateCareEvent } from "@/hooks/useCareEvents"
import { useRoute, useNavigation } from "@react-navigation/native"

export default function AddCropLogEntryScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const batchId = (route.params as { batchId?: string })?.batchId

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null)
  const [activityDetails, setActivityDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mutate: createCareEvent } = useCreateCareEvent()

  const handleSelectTemplate = (eventTypeId: string, eventTypeName: string) => {
    setSelectedActivityType(eventTypeId)
  }

  const handleActivityTypeSelect = (typeId: string, typeName: string) => {
    setSelectedActivityType(typeId)
  }

  const handleSaveEntry = async () => {
    if (!batchId) {
      Alert.alert("Error", "No batch selected")
      return
    }

    if (!selectedActivityType) {
      Alert.alert("Validation", "Please select an activity type")
      return
    }

    if (!activityDetails.trim()) {
      Alert.alert("Validation", "Please enter activity details")
      return
    }

    setIsSubmitting(true)

    try {
      createCareEvent(
        {
          batchId,
          eventTypeId: selectedActivityType,
          payload: activityDetails,
          occurredAt: selectedDate.toISOString(),
        },
        {
          onSuccess: () => {
            Alert.alert("Success", "Care event recorded successfully")
            // Reset form
            setSelectedDate(new Date())
            setSelectedActivityType(null)
            setActivityDetails("")
            navigation.goBack()
          },
          onError: (error: any) => {
            Alert.alert("Error", error.message || "Failed to save care event")
          },
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      {/* Header */}
      <View className="bg-white px-6 py-4 flex-row justify-between items-center border-b border-[#E8E8E8]">
        <TouchableOpacity onPress={handleCancel} className="flex-row items-center gap-2">
          <ChevronLeft size={20} color="#4CAF50" />
          <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-base font-semibold text-[#2D2D2D]">Log Activity</Text>
          <Text className="text-xs text-[#8A8A8A]">Record farm activity</Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <QuickTemplates onSelectTemplate={handleSelectTemplate} />

        <ActivityDetailsForm
          onActivityTypeSelect={handleActivityTypeSelect}
          onDetailsChange={setActivityDetails}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedActivityType={selectedActivityType}
        />

        {/* Action Buttons */}
        <View className="mb-8 mt-6">
          <TouchableOpacity
            onPress={handleSaveEntry}
            disabled={isSubmitting}
            className="bg-[#4CAF50] w-full py-3 rounded-xl items-center mb-3"
            style={{ opacity: isSubmitting ? 0.5 : 1 }}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-sm font-semibold text-white">Save Entry</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} className="w-full py-3 rounded-xl items-center">
            <Text className="text-sm font-semibold text-[#8A8A8A]">Cancel</Text>
          </TouchableOpacity>
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  )
}
