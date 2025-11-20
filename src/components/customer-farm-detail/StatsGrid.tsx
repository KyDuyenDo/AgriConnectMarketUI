import { View } from 'react-native';
import { StatCard } from './StatCard';

interface StatsData {
    products: number;
    years: string;
    certification: string;
}

interface StatsGridProps {
    stats: StatsData;
}

export function StatsGrid({ stats }: StatsGridProps) {
    return (
        <View className="grid grid-cols-3 gap-3 px-4 mb-4">
            <StatCard
                icon="leaf"
                value={stats.products.toString()}
                label="Products"
                iconColor="#2E7D32"
                bgColor="rgba(200, 230, 201, 1)"
            />
            <StatCard
                icon="calendar"
                value={stats.years}
                label="Years"
                iconColor="#F57C00"
                bgColor="rgba(255, 224, 178, 1)"
            />
            <StatCard
                icon="award"
                value={stats.certification}
                label="Certified"
                iconColor="#2C7BE5"
                bgColor="rgba(187, 222, 251, 1)"
            />
        </View>
    );
}
