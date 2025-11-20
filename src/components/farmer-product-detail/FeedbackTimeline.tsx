import { View, Text } from 'react-native';

interface TimelineItem {
    title: string;
    description: string;
    timestamp: string;
    color: 'green' | 'orange';
}

interface FeedbackTimelineProps {
    items: TimelineItem[];
}

export function FeedbackTimeline({ items }: FeedbackTimelineProps) {
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
                Feedback Timeline
            </Text>

            <View>
                {items.map((item, index) => {
                    const dotColor = item.color === 'green' ? '#4CAF50' : '#FFA726';
                    const isLast = index === items.length - 1;

                    return (
                        <View
                            key={index}
                            className={`flex-row items-center gap-3 ${!isLast ? 'mb-3' : ''}`}
                        >
                            <View
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: dotColor }}
                            />
                            <View className="flex-1">
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-sm font-medium" style={{ color: '#1B1F24' }}>
                                        {item.title}
                                    </Text>
                                    <Text className="text-xs" style={{ color: '#9DA3A8' }}>
                                        {item.timestamp}
                                    </Text>
                                </View>
                                <Text className="text-xs" style={{ color: '#6B737A' }}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
