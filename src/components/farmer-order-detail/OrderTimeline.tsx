import { View } from 'react-native';
import { TimelineStep } from './TimelineStep';

interface TimelineStepData {
    title: string;
    description: string;
    status: 'completed' | 'current' | 'pending';
    icon: 'check' | 'clock' | 'package';
}

interface OrderTimelineProps {
    steps: TimelineStepData[];
}

export function OrderTimeline({ steps }: OrderTimelineProps) {
    return (
        <View
            className="p-6 rounded-[20px] mx-4 mb-4"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            {steps.map((step, index) => (
                <TimelineStep
                    key={index}
                    {...step}
                    isLast={index === steps.length - 1}
                />
            ))}
        </View>
    );
}
