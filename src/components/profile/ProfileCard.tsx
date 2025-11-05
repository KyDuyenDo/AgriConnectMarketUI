import { View, Text, TouchableOpacity } from "react-native";

import { Camera, Edit3, User , Image, Star} from "lucide-react-native";

interface UserData {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    joinDate: string;
    rating: number;
    totalOrders: number;
}

export function ProfileCard(userData: UserData) {
    return (
        <View className="mx-6 -mt-6 mb-6">
            <View className="rounded-3xl bg-white p-6 shadow-lg">
                {/* Avatar Section */}
                <View className="items-center">
                    <View className="relative">
                        <Image
                            source={{ uri: userData.avatar || "" }}
                            className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                        />
                        <TouchableOpacity className="absolute bottom-0 right-0 rounded-full bg-[#4CAF50] p-2 shadow-md">
                            <Camera size={16} color="white" />
                        </TouchableOpacity>
                    </View>

                    <Text className="mt-4 text-2xl font-bold text-gray-900">{userData.name}</Text>
                    <Text className="text-gray-600">{userData.email}</Text>

                    {/* Stats */}
                    <View className="mt-4 flex-row items-center space-x-6">
                        <View className="items-center">
                            <View className="flex-row items-center">
                                <Star size={16} color="#F59E0B" />
                                <Text className="ml-1 text-lg font-semibold text-gray-900">{userData.rating}</Text>
                            </View>
                            <Text className="text-sm text-gray-600">Rating</Text>
                        </View>
                        <View className="h-8 w-px bg-gray-200" />
                        <View className="items-center">
                            <Text className="text-lg font-semibold text-gray-900">{userData.totalOrders}</Text>
                            <Text className="text-sm text-gray-600">Orders</Text>
                        </View>
                        <View className="h-8 w-px bg-gray-200" />
                        <View className="items-center">
                            <Text className="text-lg font-semibold text-gray-900">{userData.joinDate}</Text>
                            <Text className="text-sm text-gray-600">Joined</Text>
                        </View>
                    </View>
                </View>

                {/* Edit Profile Button */}
                <TouchableOpacity className="mt-6 flex-row items-center justify-center rounded-xl bg-[#4CAF50] py-3">
                    <Edit3 size={18} color="white" />
                    <Text className="ml-2 font-semibold text-white">Edit Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

