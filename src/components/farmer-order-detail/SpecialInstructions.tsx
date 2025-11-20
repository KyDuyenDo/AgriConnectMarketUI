import { View, Text } from 'react-native';

interface SpecialInstructionsProps {
    instructions: string;
}

export function SpecialInstructions({ instructions }: SpecialInstructionsProps) {
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
            <Text className="text-lg font-semibold mb-3" style={{ color: '#1B1F24' }}>
                Special Instructions
            </Text>
            <View className="p-4 rounded-[12px]" style={{ backgroundColor: '#F5F7F5' }}>
                <Text className="text-sm" style={{ color: '#2F3941' }}>
                    {instructions}
                </Text>
            </View>
        </View>
    );
}
