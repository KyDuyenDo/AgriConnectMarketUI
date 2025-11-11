import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Mail, Phone, MapPin, Bell, Shield, LogOut, Contact } from "lucide-react-native"
import { Action } from "@/components/profile/Action"
import { ProfileCard } from "@/components/profile/ProfileCard"
import { profileUserData, profileMenuItems } from "@/data/mockData"
import { ContactInformation } from "@/components/profile/ContactInformation"
import { EditProfileModal } from "@/components/profile/EditProfile"

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true)
  const [privacy, setPrivacy] = useState(false)
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false)
  
  const onOpenEditProfile = () => {
    setIsEditProfileVisible(true)
  }

  const handleMenuAction = (title: string) => {
    Alert.alert(title, `${title} pressed`)
  }

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", onPress: () => console.log("User logged out") },
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Header */}
        <View className="bg-[#4CAF50] px-6 pb-8 pt-6">
          {/* <Text className="text-center text-2xl font-bold text-white">Profile</Text> */}
        </View>

        {/* Profile Card */}
        <ProfileCard userData={profileUserData} onEditProfile={() => onOpenEditProfile()} />

        {/* Contact Information */}

        <ContactInformation
          email={profileUserData.email}
          phone={profileUserData.phone}
          location={profileUserData.location}
        />

        {/* Menu Items */}
        <View className="mx-6 mb-6">
          <Text className="mb-4 text-lg font-semibold text-gray-900">Account Settings</Text>
          <Action menuItems={profileMenuItems} onItemPress={handleMenuAction} />
        </View>

        {/* Preferences */}
        {/* <View className="mx-6 mb-6">
          <Text className="mb-4 text-lg font-semibold text-gray-900">Preferences</Text>
          <View className="rounded-2xl bg-white shadow-md">
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Bell size={20} color="#6B7280" />
                <Text className="ml-3 text-gray-900">Push Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#E5E7EB", true: "#4CAF50" }}
                thumbColor={notifications ? "white" : "white"}
              />
            </View>
            <View className="h-px bg-gray-100" />
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Shield size={20} color="#6B7280" />
                <Text className="ml-3 text-gray-900">Privacy Mode</Text>
              </View>
              <Switch
                value={privacy}
                onValueChange={setPrivacy}
                trackColor={{ false: "#E5E7EB", true: "#4CAF50" }}
                thumbColor={privacy ? "white" : "white"}
              />
            </View>
          </View>
        </View> */}

        {isEditProfileVisible && (
          <EditProfileModal
            visible={isEditProfileVisible}
            onClose={() => setIsEditProfileVisible(false)}
            onSave={(data) => console.log("Profile updated:", data)}
            name={profileUserData.name}
            email={profileUserData.email}
            phone={profileUserData.phone}
            location={profileUserData.location}
          />
        )}

        {/* Logout Button */}
        <View className="mx-6 mb-8">
          <TouchableOpacity
            className="flex-row items-center justify-center rounded-2xl bg-red-500 py-4 shadow-md"
            onPress={handleLogout}
          >
            <LogOut size={20} color="white" />
            <Text className="ml-2 font-semibold text-white">Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
