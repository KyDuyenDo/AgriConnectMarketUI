import { View, Text, Pressable } from 'react-native';
import { Phone, MessageSquare, X } from 'lucide-react-native';

interface OrderActionsProps {
    onConfirm?: () => void;
    onMarkReady?: () => void;
    onCall?: () => void;
    onMessage?: () => void;
    onCancel?: () => void;
}

export function OrderActions({
    onConfirm,
    onMarkReady,
    onCall,
    onMessage,
    onCancel
}: OrderActionsProps) {
    return (
        <View
            className="fixed bottom-0 w-full z-10 bg-white border-t-0.5 border-t border-gray-200"
        >
            <View className="p-4">
                <View className="flex-row gap-3 mb-3">
                    <Pressable
                        onPress={onConfirm}
                        className="flex-1 py-3 px-6 rounded-[20px] items-center active:bg-[#43A047]"
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
                            Confirm Order
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={onMarkReady}
                        className="flex-1 py-3 px-6 rounded-[20px] items-center active:bg-[#FB8C00]"
                        style={{
                            backgroundColor: '#FFA726',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                            elevation: 2
                        }}
                    >
                        <Text className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                            Mark Ready
                        </Text>
                    </Pressable>
                </View>

                <View className="flex-row gap-3">
                    <Pressable
                        onPress={onCall}
                        className="flex-1 py-3 px-4 rounded-[20px] flex-row items-center justify-center gap-2 border active:bg-[#F5F7F5]"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E8EAEB'
                        }}
                    >
                        <Phone size={16} color="#6B737A" />
                        <Text className="text-base font-medium" style={{ color: '#6B737A' }}>
                            Call
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={onMessage}
                        className="flex-1 py-3 px-4 rounded-[20px] flex-row items-center justify-center gap-2 border active:bg-[#F5F7F5]"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E8EAEB'
                        }}
                    >
                        <MessageSquare size={16} color="#6B737A" />
                        <Text className="text-base font-medium" style={{ color: '#6B737A' }}>
                            Message
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={onCancel}
                        className="w-12 h-12 rounded-[20px] items-center justify-center border active:bg-[#F5F7F5]"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E8EAEB'
                        }}
                    >
                        <X size={20} color="#D32F2F" />
                    </Pressable>
                </View>
            </View>
            <View style={{ height: 0 }} />
        </View>
    );
}
