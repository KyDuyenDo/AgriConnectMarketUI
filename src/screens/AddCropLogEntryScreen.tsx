"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image } from "react-native"
import { ChevronLeft, Camera, X } from "lucide-react-native"
import { QuickTemplates } from "../components/add-crop-log-entry/QuickTemplates"
import { ActivityDetailsForm } from "../components/add-crop-log-entry/ActivityDetailsForm"
import { SafeAreaView } from "react-native-safe-area-context"
import { useCreateCareEvent } from "@/hooks/useCareEvents"
import { useRoute, useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import theme from "@/utils/theme"

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
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Please grant camera roll permissions to upload images.")
      return
    }

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
      let imageFile: any = undefined
      if (selectedImage) {
        const uri = selectedImage.uri
        const fileType = uri.endsWith(".png") ? "image/png" : "image/jpeg"
        const fileName = selectedImage.fileName || `image_${Date.now()}.${fileType === "image/png" ? "png" : "jpg"}`

        imageFile = {
          uri: uri,
          name: fileName,
          type: fileType,
        }
      }

      await createCareEvent({
        batchId,
        eventTypeId: selectedActivityType,
        payload: activityDetails,
        occurredAt: selectedDate.toISOString(),
        imageFile,
      })

      Alert.alert("Success", "Care event recorded successfully")
      setSelectedDate(new Date())
      setSelectedActivityType(null)
      setActivityDetails("")
      setSelectedImage(null)
      navigation.goBack()
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save care event")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral.background }}>
      <View
        style={{
          backgroundColor: theme.colors.neutral.surface,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.neutral.borderLight,
        }}
      >
        <TouchableOpacity
          onPress={handleCancel}
          style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.sm }}
        >
          <ChevronLeft size={20} color={theme.colors.primary.main} />
          <Text
            style={{
              fontSize: theme.fontSize.base,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.primary.main,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: theme.fontSize.base,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.neutral.text.primary,
            }}
          >
            Log Activity
          </Text>
          <Text
            style={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.neutral.text.tertiary,
            }}
          >
            Record farm activity
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: theme.spacing.md, paddingTop: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        <QuickTemplates onSelectTemplate={handleSelectTemplate} />

        <ActivityDetailsForm
          onActivityTypeSelect={handleActivityTypeSelect}
          onDetailsChange={setActivityDetails}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedActivityType={selectedActivityType}
        />

        <View style={{ marginBottom: theme.spacing.md }}>
          <Text
            style={{
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.neutral.text.primary,
              marginBottom: theme.spacing.sm,
            }}
          >
            Activity Image (Optional)
          </Text>

          {selectedImage ? (
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: selectedImage.uri }}
                style={{
                  width: "100%",
                  height: 192,
                  borderRadius: theme.radius.lg,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={handleRemoveImage}
                style={{
                  position: "absolute",
                  top: theme.spacing.sm,
                  right: theme.spacing.sm,
                  backgroundColor: theme.colors.status.error,
                  borderRadius: theme.radius.full,
                  padding: theme.spacing.sm,
                }}
              >
                <X size={16} color={theme.colors.neutral.text.inverse} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handlePickImage}
              style={{
                backgroundColor: theme.colors.neutral.surface,
                borderWidth: 2,
                borderStyle: "dashed",
                borderColor: theme.colors.neutral.borderLight,
                borderRadius: theme.radius.lg,
                paddingVertical: theme.spacing.lg,
                paddingHorizontal: theme.spacing.md,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={32} color={theme.colors.neutral.text.tertiary} />
              <Text
                style={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.neutral.text.tertiary,
                  marginTop: theme.spacing.sm,
                }}
              >
                Tap to add image
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginBottom: theme.spacing.xxxl, marginTop: theme.spacing.lg }}>
          <TouchableOpacity
            onPress={handleSaveEntry}
            disabled={isSubmitting}
            style={{
              backgroundColor: theme.colors.primary.main,
              width: "100%",
              paddingVertical: theme.spacing.md,
              borderRadius: theme.radius.lg,
              alignItems: "center",
              marginBottom: theme.spacing.md,
              opacity: isSubmitting ? 0.6 : 1,
            }}
          >
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.neutral.text.inverse} />
            ) : (
              <Text
                style={{
                  fontSize: theme.fontSize.sm,
                  fontWeight: theme.fontWeight.semibold,
                  color: theme.colors.neutral.text.inverse,
                }}
              >
                Save Entry
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCancel}
            style={{
              width: "100%",
              paddingVertical: theme.spacing.md,
              borderRadius: theme.radius.lg,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSize.sm,
                fontWeight: theme.fontWeight.semibold,
                color: theme.colors.neutral.text.tertiary,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: theme.spacing.md }} />
      </ScrollView>
    </SafeAreaView>
  )
}
