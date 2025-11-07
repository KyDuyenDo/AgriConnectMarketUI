import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { User, Mail, Phone, MapPin, Settings, Bell, Shield, LogOut, ChevronRight, Camera, Edit3, Star, ShoppingBag, Truck } from "lucide-react-native"
import { Action } from "@/components/profile/Action"
import { ProfileCard } from "@/components/profile/ProfileCard"

export default function ProfileScreen() {
    const [notifications, setNotifications] = useState(true)
    const [privacy, setPrivacy] = useState(false)

    const userData = {
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "+84 123 456 789",
        location: "Hồ Chí Minh, Việt Nam",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        joinDate: "January 2024",
        rating: 4.8,
        totalOrders: 127
    }

    const menuItems = [
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
        {
            title: "Settings",
            icon: Settings,
            color: "#6B7280",
            action: () => Alert.alert("Settings", "App settings")
        },
        {
            title: "Help & Support",
            icon: Shield,
            color: "#EF4444",
            action: () => Alert.alert("Support", "Contact support team")
        }
    ]

    const handleLogout = () => {
        Alert.alert(
            "Đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Đăng xuất", onPress: () => console.log("User logged out") }
            ]
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                {/* Header */}
                <View className="bg-[#4CAF50] px-6 pb-8 pt-6">
                    <Text className="text-center text-2xl font-bold text-white">Profile</Text>
                </View>

                {/* Profile Card */}
                <ProfileCard {...userData} />

                {/* Contact Information */}
                <View className="mx-6 mb-6">
                    <Text className="mb-4 text-lg font-semibold text-gray-900">Contact Information</Text>
                    <View className="rounded-2xl bg-white p-4 shadow-md">
                        <View className="flex-row items-center py-3">
                            <Mail size={20} color="#6B7280" />
                            <Text className="ml-3 flex-1 text-gray-900">{userData.email}</Text>
                        </View>
                        <View className="h-px bg-gray-100" />
                        <View className="flex-row items-center py-3">
                            <Phone size={20} color="#6B7280" />
                            <Text className="ml-3 flex-1 text-gray-900">{userData.phone}</Text>
                        </View>
                        <View className="h-px bg-gray-100" />
                        <View className="flex-row items-center py-3">
                            <MapPin size={20} color="#6B7280" />
                            <Text className="ml-3 flex-1 text-gray-900">{userData.location}</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="mx-6 mb-6">
                    <Text className="mb-4 text-lg font-semibold text-gray-900">Account Settings</Text>
                    <Action menuItems={menuItems} />
                </View>

                {/* Preferences */}
                <View className="mx-6 mb-6">
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
                </View>

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