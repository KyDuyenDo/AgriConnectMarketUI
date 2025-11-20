import { View, Text } from 'react-native';
import { Leaf, Calendar, Award } from 'lucide-react-native';

interface StatCardProps {
    icon: 'leaf' | 'calendar' | 'award';
    value: string;
    label: string;
    iconColor: string;
    bgColor: string;
}

export function StatCard({ icon, value, label, iconColor, bgColor }: StatCardProps) {
    const IconComponent = icon === 'leaf' ? Leaf : icon === 'calendar' ? Calendar : Award;

    return (
        <View
            className="p-4 rounded-[20px] text-center items-center"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            <View
                className="w-8 h-8 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: bgColor }}
            >
                <IconComponent size={20} color={iconColor} />
            </View>
            <Text className="text-lg font-bold" style={{ color: '#1B1F24' }}>
                {value}
            </Text>
            <Text className="text-xs" style={{ color: '#6B737A' }}>
                {label}
            </Text>
        </View>
    );
}
