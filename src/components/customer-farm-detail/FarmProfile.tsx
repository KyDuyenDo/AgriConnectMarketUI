import { View, Text, Image } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';

interface FarmProfileProps {
    ownerPhoto: string;
    farmName: string;
    ownerName: string;
    sinceYear: string;
    rating: number;
    reviewCount: number;
    distance: string;
    address: string;
    description: string;
}

export function FarmProfile({
    ownerPhoto,
    farmName,
    ownerName,
    sinceYear,
    rating,
    reviewCount,
    distance,
    address,
    description
}: FarmProfileProps) {
    return (
        <View
            className="p-4 rounded-[20px] mx-4 mb-4"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            <View className="flex-row items-start gap-3 mb-3">
                <Image
                    source={{ uri: ownerPhoto }}
                    className="w-15 h-15 rounded-full"
                />
                <View className="flex-1">
                    <Text className="text-xl font-semibold mb-1" style={{ color: '#1B1F24' }}>
                        {farmName}
                    </Text>
                    <Text className="text-sm mb-1" style={{ color: '#6B737A' }}>
                        {ownerName} • Farmer since {sinceYear}
                    </Text>

                    <View className="flex-row items-center gap-2 mb-2">
                        <Star size={16} color="#FFA726" fill="#FFA726" />
                        <Text className="text-sm" style={{ color: '#6B737A' }}>
                            {rating} ({reviewCount} reviews)
                        </Text>
                        <View className="w-1 h-1 rounded-full" style={{ backgroundColor: '#E8EAEB' }} />
                        <Text className="text-sm" style={{ color: '#6B737A' }}>
                            {distance}
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <MapPin size={16} color="#6B737A" />
                        <Text className="text-sm" style={{ color: '#6B737A' }}>
                            {address}
                        </Text>
                    </View>
                </View>
            </View>

            <Text className="text-base leading-relaxed" style={{ color: '#2F3941' }}>
                {description}
            </Text>
        </View>
    );
}
