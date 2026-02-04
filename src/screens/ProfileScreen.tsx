import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogOut, MapPin, Settings, Shield, ShoppingBag, Truck, User, Trash2 } from "lucide-react-native";
import { ProfileCard } from "@/components/profile/ProfileCard";

import { useAuthStore } from "@/stores/auth";
import { useGetProfile } from "@/hooks/useProfile";
import { useGetAddresses } from "@/hooks/useAddress";
import { ProfileScreenSkeleton } from "@/components/skeletons/ProfileScreenSkeleton";
import { deactivateAccount } from "@/api/auth";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout);

  // Profile Data
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();

  // Address Data
  const { data: addresses, isLoading: isAddressLoading } = useGetAddresses();

  // Unified loading state
  const isLoading = isProfileLoading || isAddressLoading;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const handleDeactivateAccount = () => {
    Alert.alert(
      "Deactivate Account",
      "Are you sure you want to deactivate your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Deactivate",
          style: "destructive",
          onPress: async () => {
            try {
              await deactivateAccount();
              Alert.alert("Account Deactivated", "Your account has been deactivated.", [
                { text: "OK", onPress: () => logout() }
              ]);
            } catch (error: any) {
              Alert.alert("Error", error?.response?.data?.message || "Failed to deactivate account.");
            }
          }
        },
      ]
    );
  };

  const handleMenuAction = (title: string, action: () => void) => {
    switch (title) {
      case "Personal Information":
        navigation.navigate("PersonalInformation" as never);
        break;
      case "Shipping Address":
        navigation.navigate("CustomerAddress" as never);
        break;
      case "My Orders":
        navigation.navigate("CustomerOrders" as never);
        break;
      default:
        action();
        break;
    }
  };

  // Show skeleton while loading
  if (isLoading) {
    return <ProfileScreenSkeleton />;
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

  const profileMenuItems = [
    {
      title: "Personal Information",
      icon: User,
      color: "#3B82F6",
      action: () => Alert.alert("Personal Info", "Edit personal information")
    },
    {
      title: "My Orders",
      icon: ShoppingBag,
      color: "#10B981",
      action: () => Alert.alert("Orders", "View order history")
    },
    {
      title: "Shipping Address",
      icon: Truck,
      color: "#F59E0B",
      action: () => Alert.alert("Shipping", "Manage shipping addresses")
    },
    //{
    //   title: "Settings",
    //   icon: Settings,
    //   color: "#6B7280",
    //   action: () => Alert.alert("Settings", "App settings")
    // },
    // {
    //   title: "Help & Support",
    //   icon: Shield,
    //   color: "#EF4444",
    //   action: () => Alert.alert("Support", "Contact support team")
    // }
    {
      title: "Deactivate Account",
      icon: Trash2,
      color: "#EF4444",
      action: handleDeactivateAccount
    }
  ]

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
          {defaultAddress ? (
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
            {profileMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center justify-between p-4 ${index !== profileMenuItems.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  onPress={() => handleMenuAction(item.title, item.action)}
                >
                  <View className="flex-row items-center">
                    <View className={`mr-4 rounded-full p-2`} style={{ backgroundColor: `${item.color}15` }}>
                      <Icon size={20} color={item.color} />
                    </View>
                    <Text className="text-base font-medium text-gray-900">{item.title}</Text>
                  </View>
                  <Text className="text-gray-400">›</Text>
                </TouchableOpacity>
              );
            })}
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
