import { View, Text } from 'react-native';

interface HistoryEvent {
    year: string;
    title: string;
    description: string;
    color: 'green' | 'orange' | 'blue';
}

interface FarmHistoryProps {
    events: HistoryEvent[];
}

export function FarmHistory({ events }: FarmHistoryProps) {
    const getColorStyle = (color: string) => {
        const colors = {
            green: '#4CAF50',
            orange: '#FFA726',
            blue: '#2C7BE5'
        };
        return colors[color as keyof typeof colors] || colors.green;
    };

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
            {events.map((event, index) => (
                <View
                    key={index}
                    className={`flex-row gap-3 ${index < events.length - 1 ? 'mb-4' : ''}`}
                >
                    <View
                        className="w-8 h-8 rounded-full items-center justify-center shrink-0"
                        style={{ backgroundColor: getColorStyle(event.color) }}
                    >
                        <Text className="text-xs font-bold" style={{ color: '#FFFFFF' }}>
                            {event.year}
                        </Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm font-semibold" style={{ color: '#1B1F24' }}>
                            {event.title}
                        </Text>
                        <Text className="text-xs" style={{ color: '#6B737A' }}>
                            {event.description}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}
