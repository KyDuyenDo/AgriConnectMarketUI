import { View, Text, Pressable } from 'react-native';
import { Clock, Phone, Mail } from 'lucide-react-native';

interface VisitFarmCardProps {
    hours: string;
    phone: string;
    email: string;
    onGetDirections?: () => void;
    onCall?: () => void;
}

export function VisitFarmCard({
    hours,
    phone,
    email,
    onGetDirections,
    onCall
}: VisitFarmCardProps) {
    return (
        <View
            className="p-4 rounded-[24px] mx-4 mb-4"
            style={{ backgroundColor: '#4CAF50' }}
        >
            <Text className="text-lg font-semibold mb-3" style={{ color: '#FFFFFF' }}>
                Visit Our Farm
            </Text>

            <View className="mb-4">
                <View className="flex-row items-center gap-3 mb-2">
                    <Clock size={18} color="#FFFFFF" />
                    <Text className="text-sm" style={{ color: '#FFFFFF' }}>
                        {hours}
                    </Text>
                </View>
                <View className="flex-row items-center gap-3 mb-2">
                    <Phone size={18} color="#FFFFFF" />
                    <Text className="text-sm" style={{ color: '#FFFFFF' }}>
                        {phone}
                    </Text>
                </View>
                <View className="flex-row items-center gap-3">
                    <Mail size={18} color="#FFFFFF" />
                    <Text className="text-sm" style={{ color: '#FFFFFF' }}>
                        {email}
                    </Text>
                </View>
            </View>

            <View className="flex-row gap-2">
                <Pressable
                    onPress={onGetDirections}
                    className="flex-1 py-3 px-6 rounded-[20px] items-center active:bg-[#F5F7F5]"
                    style={{ backgroundColor: '#FFFFFF' }}
                >
                    <Text className="text-sm font-semibold" style={{ color: '#4CAF50' }}>
                        Get Directions
                    </Text>
                </Pressable>
                <Pressable
                    onPress={onCall}
                    className="flex-1 py-3 px-6 rounded-[20px] items-center active:bg-[#388E3C]"
                    style={{ backgroundColor: '#43A047' }}
                >
                    <Text className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        Call Farm
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
