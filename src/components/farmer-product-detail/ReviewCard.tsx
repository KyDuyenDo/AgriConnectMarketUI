import { View, Text, Image, Pressable } from 'react-native';
import { Star, Play, Reply } from 'lucide-react-native';

interface FarmerReply {
    farmName: string;
    farmerAvatar: string;
    timestamp: string;
    text: string;
}

interface ReviewCardProps {
    customerName: string;
    customerAvatar: string;
    rating: number;
    timestamp: string;
    text: string;
    videoLength?: string;
    farmerReply?: FarmerReply;
    onReply?: () => void;
}

export function ReviewCard({
    customerName,
    customerAvatar,
    rating,
    timestamp,
    text,
    videoLength,
    farmerReply,
    onReply
}: ReviewCardProps) {
    const renderStars = (count: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <View key={i} className="w-4 h-4 items-center justify-center">
                <Star
                    size={14}
                    color={i < count ? "#FFA726" : "#E8EAEB"}
                    fill={i < count ? "#FFA726" : "#E8EAEB"}
                />
            </View>
        ));
    };

    return (
        <View
            className="p-4 rounded-[20px] mb-3"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            {/* Customer Info */}
            <View className="flex-row items-start gap-3 mb-3">
                <Image
                    source={{ uri: customerAvatar }}
                    className="w-10 h-10 rounded-full"
                />
                <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-sm font-semibold" style={{ color: '#1B1F24' }}>
                            {customerName}
                        </Text>
                        {videoLength && (
                            <View className="flex-row items-center gap-1">
                                <Pressable
                                    className="w-8 h-8 items-center justify-center rounded-full active:bg-[#E8EAEB]"
                                    style={{ backgroundColor: '#F5F7F5' }}
                                >
                                    <Play size={14} color="#4CAF50" />
                                </Pressable>
                                <Text className="text-xs" style={{ color: '#9DA3A8' }}>
                                    {videoLength}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View className="flex-row items-center gap-1">
                        {renderStars(rating)}
                        <Text className="text-xs ml-2" style={{ color: '#9DA3A8' }}>
                            {timestamp}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Review Text */}
            <Text className="text-sm mb-3" style={{ color: '#2F3941' }}>
                {text}
            </Text>

            {/* Farmer Reply */}
            {farmerReply && (
                <View
                    className="ml-4 p-3 rounded-[12px]"
                    style={{ backgroundColor: '#F5F7F5' }}
                >
                    <View className="flex-row items-center gap-2 mb-2">
                        <Image
                            source={{ uri: farmerReply.farmerAvatar }}
                            className="w-6 h-6 rounded-full"
                        />
                        <Text className="text-xs font-medium" style={{ color: '#4CAF50' }}>
                            {farmerReply.farmName}
                        </Text>
                        <Text className="text-xs" style={{ color: '#9DA3A8' }}>
                            {farmerReply.timestamp}
                        </Text>
                    </View>
                    <Text className="text-xs" style={{ color: '#2F3941' }}>
                        {farmerReply.text}
                    </Text>
                </View>
            )}

            {/* Reply Button */}
            {!farmerReply && onReply && (
                <Pressable
                    onPress={onReply}
                    className="flex-row items-center gap-2 ml-4"
                >
                    <View className="w-4 h-4 items-center justify-center">
                        <Reply size={16} color="#4CAF50" />
                    </View>
                    <Text className="text-sm font-medium" style={{ color: '#4CAF50' }}>
                        Reply
                    </Text>
                </Pressable>
            )}
        </View>
    );
}
