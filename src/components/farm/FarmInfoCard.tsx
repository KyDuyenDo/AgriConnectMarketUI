import { View, Text, Image } from "react-native";
import { MapPin, Mountain, Calendar } from "lucide-react-native";

interface FarmInfoCardProps {
    name: string;
    location: string;
    size: number;
    description: string;
    logoUrl: any; // string uri or require()
    activeSeasons: number;
    activeSeasonsStatus: string;
}

export function FarmInfoCard({
    name,
    location,
    size,
    description,
    logoUrl,
    activeSeasons,
    activeSeasonsStatus,
}: FarmInfoCardProps) {
    return (
        <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                    <Text className="text-2xl font-bold text-gray-900 mb-1">{name}</Text>
                    <View className="flex-row items-center mb-1">
                        <MapPin size={14} color="#9ca3af" style={{ marginRight: 4 }} />
                        <Text className="text-gray-500 text-sm">{location}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Mountain size={14} color="#9ca3af" style={{ marginRight: 4 }} />
                        <Text className="text-gray-500 text-sm">{size} acres</Text>
                    </View>
                </View>
                <Image
                    source={logoUrl}
                    className="w-16 h-16 rounded-full"
                    resizeMode="contain"
                />
            </View>

            <Text className="text-gray-600 text-sm leading-5 mb-6">
                {description}
            </Text>

            <View className="bg-gray-50 rounded-xl p-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className="bg-green-500 w-10 h-10 rounded-full items-center justify-center mr-3">
                        <Calendar size={20} color="white" />
                    </View>
                    <View>
                        <Text className="font-semibold text-gray-900">
                            {activeSeasons} Active Seasons
                        </Text>
                        <Text className="text-gray-500 text-xs">Total growing periods</Text>
                    </View>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-green-600 text-xs font-medium">
                        {activeSeasonsStatus}
                    </Text>
                </View>
            </View>
        </View>
    );
}
