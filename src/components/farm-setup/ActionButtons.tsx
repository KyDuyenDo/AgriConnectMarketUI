import { View, Text, Pressable } from 'react-native';

interface ActionButtonsProps {
    onSave?: () => void;
    onPreview?: () => void;
}

export function ActionButtons({ onSave, onPreview }: ActionButtonsProps) {
    return (
        <View className="px-4 pb-6">
            <Pressable
                onPress={onSave}
                className="w-full mb-3 py-4 px-6 rounded-[20px] items-center justify-center active:bg-[#43A047]"
                style={{
                    backgroundColor: '#4CAF50',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 2
                }}
            >
                <Text className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                    Save Farm Profile
                </Text>
            </Pressable>

            <Pressable
                onPress={onPreview}
                className="w-full py-4 px-6 rounded-[20px] border border-solid items-center justify-center active:bg-[#F5F7F5]"
                style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E8EAEB',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 2
                }}
            >
                <Text className="text-base font-semibold" style={{ color: '#2F3941' }}>
                    Preview Profile
                </Text>
            </Pressable>
        </View>
    );
}
