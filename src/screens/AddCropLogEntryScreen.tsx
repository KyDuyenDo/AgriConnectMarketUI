"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image } from "react-native"
import { ChevronLeft, Camera, X } from "lucide-react-native"
import { QuickTemplates } from "../components/add-crop-log-entry/QuickTemplates"
import { ActivityDetailsForm } from "../components/add-crop-log-entry/ActivityDetailsForm"
import { SafeAreaView } from "react-native-safe-area-context"
import { useCreateCareEvent } from "@/hooks/useCareEvents"
import { useRoute, useNavigation } from "@react-navigation/native"
import * as ImagePicker from 'expo-image-picker'

export default function AddCropLogEntryScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const batchId = (route.params as { batchId?: string })?.batchId

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null)
  const [activityDetails, setActivityDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null)

  const { mutateAsync: createCareEvent } = useCreateCareEvent()

  const handleSelectTemplate = (eventTypeId: string, eventTypeName: string) => {
    setSelectedActivityType(eventTypeId)
  }

  const handleActivityTypeSelect = (typeId: string, typeName: string) => {
    setSelectedActivityType(typeId)
  }

  const handlePickImage = async () => {
    // Request permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Please grant camera roll permissions to upload images.")
      return
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0])
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
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
      // Prepare image file if selected (React Native compatible format)
      let imageFile: any = undefined
      if (selectedImage) {
        // Determine MIME type based on URI or default to image/jpeg
        const uri = selectedImage.uri;
        const fileType = uri.endsWith('.png') ? 'image/png' : 'image/jpeg';
        const fileName = selectedImage.fileName || `image_${Date.now()}.${fileType === 'image/png' ? 'png' : 'jpg'}`;

        // In React Native, FormData accepts objects with uri, name, and type
        imageFile = {
          uri: uri,
          name: fileName,
          type: fileType, // Must be a valid MIME type (e.g., image/jpeg), NOT just 'image'
        }
      }

      await createCareEvent(
        {
          batchId,
          eventTypeId: selectedActivityType,
          payload: activityDetails,
          occurredAt: selectedDate.toISOString(),
          imageFile, // Pass the image file
        },
        {
          onSuccess: () => {
            Alert.alert("Success", "Care event recorded successfully")
            // Reset form
            setSelectedDate(new Date())
            setSelectedActivityType(null)
            setActivityDetails("")
            setSelectedImage(null)
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

        {/* Image Upload Section */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-[#2D2D2D] mb-2">Activity Image (Optional)</Text>

          {selectedImage ? (
            <View className="relative">
              <Image
                source={{ uri: selectedImage.uri }}
                className="w-full h-48 rounded-xl"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
              >
                <X size={16} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handlePickImage}
              className="bg-white border-2 border-dashed border-[#E0E0E0] rounded-xl p-6 items-center justify-center"
            >
              <Camera size={32} color="#8A8A8A" />
              <Text className="text-sm text-[#8A8A8A] mt-2">Tap to add image</Text>
            </TouchableOpacity>
          )}
        </View>

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
