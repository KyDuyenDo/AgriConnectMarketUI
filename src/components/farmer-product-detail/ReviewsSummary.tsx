import { View, Text } from 'react-native';
import { Star } from 'lucide-react-native';

interface RatingBreakdown {
    stars: number;
    count: number;
    percentage: number;
}

interface ReviewsSummaryProps {
    averageRating: number;
    totalReviews: number;
    breakdown: RatingBreakdown[];
}

export function ReviewsSummary({ averageRating, totalReviews, breakdown }: ReviewsSummaryProps) {
    const renderStars = (count: number, filled: boolean = true) => {
        return Array.from({ length: count }).map((_, i) => (
            <View key={i} className="w-4 h-4 items-center justify-center">
                <Star
                    size={16}
                    color={filled ? "#FFA726" : "#E8EAEB"}
                    fill={filled ? "#FFA726" : "#E8EAEB"}
                />
            </View>
        ));
    };

    return (
        <View
            className="p-4 rounded-[20px] mx-4 my-2"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            <Text className="text-lg font-semibold mb-4" style={{ color: '#1B1F24' }}>
                Customer Reviews
            </Text>

            <View className="flex-row items-center gap-4">
                {/* Left: Overall Rating */}
                <View className="text-center">
                    <Text className="text-3xl font-bold" style={{ color: '#1B1F24' }}>
                        {averageRating.toFixed(1)}
                    </Text>
                    <View className="flex-row justify-center items-center gap-1 my-1">
                        {renderStars(4, true)}
                        {renderStars(1, false)}
                    </View>
                    <Text className="text-xs" style={{ color: '#6B737A' }}>
                        {totalReviews} reviews
                    </Text>
                </View>

                {/* Right: Rating Breakdown */}
                <View className="flex-1">
                    {breakdown.map((item) => (
                        <View key={item.stars} className="flex-row items-center gap-2 mb-2">
                            <Text className="text-xs w-4" style={{ color: '#6B737A' }}>
                                {item.stars}
                            </Text>
                            <View className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8EAEB' }}>
                                <View
                                    className="h-full rounded-full"
                                    style={{
                                        backgroundColor: '#FFA726',
                                        width: `${item.percentage}%`
                                    }}
                                />
                            </View>
                            <Text className="text-xs w-6" style={{ color: '#6B737A' }}>
                                {item.count}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}
