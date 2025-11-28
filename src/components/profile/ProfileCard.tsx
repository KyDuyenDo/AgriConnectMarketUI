import { View, Text, TouchableOpacity, Image } from "react-native";

import { Camera, Edit3, User, Star } from "lucide-react-native";

interface UserData {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
}

interface ProfileCardProps {
    userData: UserData;
    onEditProfile?: () => void;
}

export function ProfileCard({ userData, onEditProfile }: ProfileCardProps) {
    return (
        <View className="mx-6 -mt-6 mb-6">
            <View className="rounded-3xl bg-white p-6 shadow-lg space-x-4">
                {/* Avatar Section */}
                <View className="items-center mx-2">
                    <View className="relative">
                        <Image
                            source={{ uri: userData?.avatar || "" }}
                            className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                        />
                    </View>

                    <Text className="mt-4 text-2xl font-bold text-gray-900">{userData?.name}</Text>
                    <Text className="text-gray-600">{userData?.email}</Text>
                </View>

                {/* Edit Profile Button */}
                {onEditProfile && (
                    <TouchableOpacity className="mt-6 flex-row items-center justify-center rounded-xl bg-[#4CAF50] py-3" onPress={onEditProfile}>
                        <Edit3 size={18} color="white" />
                        <Text className="ml-2 font-semibold text-white">Edit Profile</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
