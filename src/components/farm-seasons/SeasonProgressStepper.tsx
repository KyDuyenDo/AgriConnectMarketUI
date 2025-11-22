import React from 'react';
import { View, Text } from 'react-native';
import { Check, Sprout, TrendingUp, PackageCheck, CheckCircle } from 'lucide-react-native';

interface SeasonProgressStepperProps {
    status: string;
}

type StepStatus = 'completed' | 'current' | 'upcoming';

interface Step {
    id: number;
    label: string;
    icon: typeof Sprout;
    status: StepStatus;
}

export const SeasonProgressStepper: React.FC<SeasonProgressStepperProps> = ({ status }) => {
    const normalizedStatus = status?.toLowerCase() || 'pending';

    // Determine which step is current based on status
    const getCurrentStep = (): number => {
        if (normalizedStatus === 'pending' || normalizedStatus === 'planning') return 1;
        if (normalizedStatus === 'active' || normalizedStatus === 'growing') return 2;
        if (normalizedStatus === 'harvesting') return 3;
        if (normalizedStatus === 'completed' || normalizedStatus === 'done') return 4;
        return 1; // Default to planting
    };

    const currentStepNumber = getCurrentStep();

    const steps: Step[] = [
        { id: 1, label: 'Planting', icon: Sprout, status: currentStepNumber > 1 ? 'completed' : currentStepNumber === 1 ? 'current' : 'upcoming' },
        { id: 2, label: 'Growing', icon: TrendingUp, status: currentStepNumber > 2 ? 'completed' : currentStepNumber === 2 ? 'current' : 'upcoming' },
        { id: 3, label: 'Harvesting', icon: PackageCheck, status: currentStepNumber > 3 ? 'completed' : currentStepNumber === 3 ? 'current' : 'upcoming' },
        { id: 4, label: 'Completed', icon: CheckCircle, status: currentStepNumber >= 4 ? 'completed' : 'upcoming' },
    ];

    const getStepColors = (stepStatus: StepStatus) => {
        if (stepStatus === 'completed') {
            return {
                bg: '#dcfce7',
                text: '#16a34a',
                border: '#16a34a',
            };
        }
        if (stepStatus === 'current') {
            return {
                bg: '#dcfce7',
                text: '#16a34a',
                border: '#16a34a',
            };
        }
        return {
            bg: '#f3f4f6',
            text: '#9ca3af',
            border: '#e5e7eb',
        };
    };

    return (
        <View className="bg-white px-4 py-5 mb-4 rounded-2xl shadow-sm shadow-grey-200">
            <Text className="text-sm font-semibold text-gray-900 mb-4">Season Progress</Text>
            <View className="flex-row items-center justify-between">
                {steps.map((step, index) => {
                    const colors = getStepColors(step.status);
                    const Icon = step.icon;
                    const isLast = index === steps.length - 1;

                    return (
                        <React.Fragment key={step.id}>
                            <View className="items-center" style={{ flex: 1 }}>
                                {/* Icon Circle */}
                                <View
                                    className="w-10 h-10 rounded-full items-center justify-center mb-2"
                                    style={{
                                        backgroundColor: colors.bg,
                                        borderWidth: 2,
                                        borderColor: colors.border,
                                    }}
                                >
                                    {step.status === 'completed' ? (
                                        <Check size={20} color={colors.text} strokeWidth={3} />
                                    ) : (
                                        <Icon size={18} color={colors.text} />
                                    )}
                                </View>
                                {/* Label */}
                                <Text
                                    className="text-xs font-medium text-center"
                                    style={{ color: colors.text }}
                                    numberOfLines={1}
                                >
                                    {step.label}
                                </Text>
                            </View>

                            {/* Connector Line */}
                            {!isLast && (
                                <View
                                    className="h-0.5 -mt-6"
                                    style={{
                                        flex: 0.5,
                                        backgroundColor: step.status === 'completed' ? '#16a34a' : '#e5e7eb',
                                    }}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </View>
        </View>
    );
};
