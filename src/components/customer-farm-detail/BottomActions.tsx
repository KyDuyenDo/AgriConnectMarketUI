import { View, Text, Pressable } from 'react-native';
import { MessageCircle } from 'lucide-react-native';

interface BottomActionsProps {
    onMessage?: () => void;
    onViewProducts?: () => void;
}

export function BottomActions({ onMessage, onViewProducts }: BottomActionsProps) {
    return (
        <View
            className="fixed bottom-0 w-full z-10"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 5
            }}
        >
            <View className="p-4">
                <View className="flex-row gap-3">
                    <Pressable
                        onPress={onMessage}
                        className="py-3 px-6 rounded-[20px] flex-row items-center active:bg-[#E8EAEB]"
                        style={{ backgroundColor: '#F5F7F5' }}
                    >
                        <MessageCircle size={20} color="#4CAF50" />
                        <Text className="text-sm font-semibold ml-2" style={{ color: '#4CAF50' }}>
                            Message
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={onViewProducts}
                        className="flex-1 py-3 px-6 rounded-[20px] items-center active:bg-[#43A047]"
                        style={{ backgroundColor: '#4CAF50' }}
                    >
                        <Text className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                            View All Products
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ height: 0 }} /> {/* Safe area bottom */}
        </View>
    );
}
