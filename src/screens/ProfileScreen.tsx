import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogOut, MapPin } from "lucide-react-native";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { profileMenuItems } from "@/data/mockData";
import { useAuthStore } from "@/stores/auth";
import { useGetProfile } from "@/hooks/useProfile";
import { useGetAddresses } from "@/hooks/useAddress";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout);

  // Profile Data
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();

  // Address Data
  const { data: addresses, isLoading: isAddressLoading } = useGetAddresses();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const handleMenuAction = (title: string, action: () => void) => {
    if (title === "Personal Information") {
      navigation.navigate("PersonalInformation" as never);
    } else {
      action();
    }
  };

  if (isProfileLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  const displayUserData = {
    name: profile?.fullname || "User",
    email: profile?.email || "",
    phone: profile?.phone || "",
    avatar: profile?.avatarUrl || "https://i.pravatar.cc/300",
    location: addresses?.find(a => a.isDefault)?.province || "Vietnam",
    joinDate: "2023", // Mock data
    rating: 5.0, // Mock data
    totalOrders: 0 // Mock data
  };

  const defaultAddress = addresses?.find(a => a.isDefault);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="relative" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="absolute w-full h-48 bg-red-300"></View>
        <View className="h-10"></View>
        {/* Profile Header */}
        <View className="mt-6">
          <ProfileCard userData={displayUserData} />
        </View>

        {/* Default Address Section */}
        <View className="mt-6 px-4">
          <Text className="mb-4 text-lg font-bold text-gray-900">My Address</Text>
          {isAddressLoading ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : defaultAddress ? (
            <View className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              <View className="flex-row items-start">
                <View className="mt-1 mr-3 rounded-full bg-green-50 p-2">
                  <MapPin size={20} color="#4CAF50" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-base font-semibold text-gray-900 mr-2">Default Address</Text>
                    <View className="bg-green-100 px-2 py-0.5 rounded">
                      <Text className="text-xs font-medium text-green-700">Default</Text>
                    </View>
                  </View>
                  <Text className="text-gray-600 leading-5">
                    {defaultAddress.detail}, {defaultAddress.ward}, {defaultAddress.district}, {defaultAddress.province}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 items-center justify-center">
              <Text className="text-gray-500">No default address set.</Text>
            </View>
          )}
        </View>

        {/* Menu Items */}
        <View className="mt-6 px-4">
          <Text className="mb-4 text-lg font-bold text-gray-900">Account Settings</Text>
          <View className="overflow-hidden rounded-2xl bg-white shadow-sm">
            {profileMenuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center justify-between p-4 ${index !== profileMenuItems.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                onPress={() => handleMenuAction(item.title, item.action)}
              >
                <View className="flex-row items-center">
                  <View className={`mr-4 rounded-full p-2`} style={{ backgroundColor: `${item.color}15` }}>
                    <item.icon size={20} color={item.color} />
                  </View>
                  <Text className="text-base font-medium text-gray-900">{item.title}</Text>
                </View>
                <Text className="text-gray-400">›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View className="mt-8 px-4">
          <TouchableOpacity
            className="flex-row items-center justify-center rounded-2xl bg-red-50 p-4"
            onPress={handleLogout}
          >
            <LogOut size={20} color="#EF4444" />
            <Text className="ml-2 font-semibold text-red-500">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
