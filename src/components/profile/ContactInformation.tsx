import { Mail, MapPin, Phone } from "lucide-react-native";
import { View, Text } from "react-native";

interface ContactInformationProps {
    email: string;
    phone: string;
    location: string;
}
export function ContactInformation({ email, phone, location }: ContactInformationProps) {
    return (
        <View className="mx-6 mb-6">
            <Text className="mb-4 text-lg font-semibold text-gray-900">Contact Information</Text>
            <View className="rounded-2xl bg-white p-4 shadow-md">
                <View className="flex-row items-center py-3">
                    <Mail size={20} color="#6B7280" />
                    <Text className="ml-3 flex-1 text-gray-900">{email}</Text>
                </View>
                <View className="h-px bg-gray-100" />
                <View className="flex-row items-center py-3">
                    <Phone size={20} color="#6B7280" />
                    <Text className="ml-3 flex-1 text-gray-900">{phone}</Text>
                </View>
                <View className="h-px bg-gray-100" />
                <View className="flex-row items-center py-3">
                    <MapPin size={20} color="#6B7280" />
                    <Text className="ml-3 flex-1 text-gray-900">{location}</Text>
                </View>
            </View>
        </View>
    )
}