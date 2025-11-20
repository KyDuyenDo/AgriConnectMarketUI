import { View, Text, TouchableOpacity } from 'react-native';

export function FarmUpdateCard() {
    return (
        <View className="px-4 mb-4">
            <View
                className="relative p-4 rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#4CAF50' }}
            >
                <View className="relative z-10">
                    <View
                        className="px-3 py-1.5 rounded-full mb-3 self-start"
                        style={{ backgroundColor: '#FFFFFF' }}
                    >
                        <Text className="text-xs font-medium" style={{ color: '#4CAF50' }}>
                            Farm Updates
                        </Text>
                    </View>

                    <Text className="text-[18px] font-bold mb-2" style={{ color: '#FFFFFF' }}>
                        Sweet Valley Farm
                    </Text>

                    <Text
                        className="text-sm mb-3"
                        style={{ color: '#FFFFFF', opacity: 0.9 }}
                    >
                        New strawberry harvest is ready! Fresh picked this morning with extra sweetness from recent rains.
                    </Text>

                    <TouchableOpacity
                        className="px-4 py-2 rounded-xl self-start"
                        style={{ backgroundColor: '#FFFFFF' }}
                        activeOpacity={0.7}
                    >
                        <Text className="text-sm font-semibold" style={{ color: '#7EC850' }}>
                            View Products
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Decorative circle */}
                <View
                    className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full"
                    style={{ backgroundColor: '#FFFFFF', opacity: 0.1 }}
                />
            </View>
        </View>
    );
}
