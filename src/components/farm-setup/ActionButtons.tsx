import { View, Text, Pressable, ActivityIndicator } from "react-native"

interface ActionButtonsProps {
    onSave?: () => void
    onPreview?: () => void
    isLoading?: boolean
}

export function ActionButtons({ onSave, onPreview, isLoading = false }: ActionButtonsProps) {
    return (
        <View className="px-4 pb-6">
            <Pressable
                onPress={onSave}
                disabled={isLoading}
                className="w-full mb-3 py-4 px-6 rounded-[20px] items-center justify-center active:bg-[#43A047]"
                style={{
                    backgroundColor: isLoading ? "#A5D6A7" : "#4CAF50",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 2,
                    opacity: isLoading ? 0.7 : 1,
                }}
            >
                {isLoading ? (
                    <View className="flex-row items-center">
                        <ActivityIndicator size="small" color="#FFFFFF" />
                        <Text className="text-base font-semibold ml-2" style={{ color: "#FFFFFF" }}>
                            Creating Farm...
                        </Text>
                    </View>
                ) : (
                    <Text className="text-base font-semibold" style={{ color: "#FFFFFF" }}>
                        Save Farm Profile
                    </Text>
                )}
            </Pressable>

            <Pressable
                onPress={onPreview}
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-[20px] border border-solid items-center justify-center active:bg-[#F5F7F5]"
                style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E8EAEB",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 2,
                    opacity: isLoading ? 0.5 : 1,
                }}
            >
                <Text className="text-base font-semibold" style={{ color: isLoading ? "#BCC0C4" : "#2F3941" }}>
                    Preview Profile
                </Text>
            </Pressable>
        </View>
    )
}
