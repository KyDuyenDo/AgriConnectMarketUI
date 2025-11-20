import { View, Text } from 'react-native';
import { Check, Clock, Package } from 'lucide-react-native';

interface TimelineStepProps {
    title: string;
    description: string;
    status: 'completed' | 'current' | 'pending';
    icon: 'check' | 'clock' | 'package';
    isLast?: boolean;
}

export function TimelineStep({ title, description, status, icon, isLast }: TimelineStepProps) {
    const statusConfig = {
        completed: { bg: 'rgba(200, 230, 201, 1)', iconColor: '#2E7D32' },
        current: { bg: 'rgba(255, 167, 38, 1)', iconColor: '#FFFFFF' },
        pending: { bg: 'rgba(232, 234, 235, 1)', iconColor: '#9DA3A8' }
    };

    const IconComponent = icon === 'check' ? Check : icon === 'clock' ? Clock : Package;
    const config = statusConfig[status];

    const textColor = status === 'pending' ? '#9DA3A8' : '#1B1F24';
    const descColor = status === 'pending' ? '#9DA3A8' : '#6B737A';

    return (
        <View className={`flex-row items-center gap-3 ${!isLast ? 'mb-3' : ''}`}>
            <View
                className="w-8 h-8 rounded-full items-center justify-center shrink-0"
                style={{ backgroundColor: config.bg }}
            >
                <IconComponent size={16} color={config.iconColor} />
            </View>
            <View className="flex-1">
                <Text className="text-sm font-medium" style={{ color: textColor }}>
                    {title}
                </Text>
                <Text className="text-xs" style={{ color: descColor }}>
                    {description}
                </Text>
            </View>
        </View>
    );
}
