import { View, Text } from 'react-native';
import { TrendingUp, DollarSign } from 'lucide-react-native';

interface SalesPerformanceProps {
    unitsSold: number;
    unitsTrend: string;
    revenue: string;
    revenueTrend: string;
    stockRemaining: string;
    stockPercentage: number;
}

export function SalesPerformance({
    unitsSold,
    unitsTrend,
    revenue,
    revenueTrend,
    stockRemaining,
    stockPercentage
}: SalesPerformanceProps) {
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
                Sales Performance
            </Text>

            {/* Stats Grid */}
            <View className="grid grid-cols-2 gap-4 mb-4">
                {/* Units Sold */}
                <View className="p-3 rounded-[12px]" style={{ backgroundColor: '#F5F7F5' }}>
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="w-4 h-4 items-center justify-center">
                            <TrendingUp size={16} color="#4CAF50" />
                        </View>
                        <Text className="text-sm" style={{ color: '#6B737A' }}>
                            Units Sold
                        </Text>
                    </View>
                    <Text className="text-xl font-bold mb-2" style={{ color: '#1B1F24' }}>
                        {unitsSold}
                    </Text>
                    <Text className="text-xs" style={{ color: '#4CAF50' }}>
                        {unitsTrend}
                    </Text>
                </View>

                {/* Revenue */}
                <View className="p-3 rounded-[12px]" style={{ backgroundColor: '#F5F7F5' }}>
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="w-4 h-4 items-center justify-center">
                            <DollarSign size={16} color="#FFA726" />
                        </View>
                        <Text className="text-sm" style={{ color: '#6B737A' }}>
                            Revenue
                        </Text>
                    </View>
                    <Text className="text-xl font-bold mb-2" style={{ color: '#1B1F24' }}>
                        ${revenue}
                    </Text>
                    <Text className="text-xs" style={{ color: '#4CAF50' }}>
                        {revenueTrend}
                    </Text>
                </View>
            </View>

            {/* Stock Level */}
            <View>
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-medium" style={{ color: '#2F3941' }}>
                        Stock Level
                    </Text>
                    <Text className="text-sm" style={{ color: '#F57C00' }}>
                        {stockRemaining}
                    </Text>
                </View>
                <View className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8EAEB' }}>
                    <View
                        className="h-full rounded-full"
                        style={{
                            backgroundColor: '#FFA726',
                            width: `${stockPercentage}%`
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
