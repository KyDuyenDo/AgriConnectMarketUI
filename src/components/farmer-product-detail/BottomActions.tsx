import { View, Text, Pressable } from 'react-native';

interface BottomActionsProps {
    onEditProduct?: () => void;
    onReplyToReviews?: () => void;
}

export function BottomActions({ onEditProduct, onReplyToReviews }: BottomActionsProps) {
    return (
        <View
            className="fixed bottom-0 w-full z-10 border-t-[1px] border-gray-200"
        >
            <View className="bg-white p-4">
                <View className="flex-row gap-3">
                    <Pressable
                        onPress={onEditProduct}
                        className="flex-1 py-3 px-6 rounded-[20px] items-center justify-center active:bg-[#FB8C00]"
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
                            Edit Product
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={onReplyToReviews}
                        className="flex-1 py-3 px-6 rounded-[20px] items-center justify-center active:bg-[#43A047]"
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
                            Reply to Reviews
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
