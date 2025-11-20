import { View, Text, TouchableOpacity } from 'react-native';
import { ShoppingCart, CheckSquare, Share } from 'lucide-react-native';

export function ActionButtonRow() {
    return (
        <View className="mb-4 px-4">
            <View className="p-3 bg-white rounded-2xl flex-row items-center justify-between"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 3
                }}
            >
                <View className="flex-row items-center gap-3">
                    <TouchableOpacity
                        className="flex-row items-center px-3 py-2 rounded-xl"
                        style={{ backgroundColor: '#81C784' }}
                        activeOpacity={0.7}
                    >
                        <View className="w-4 h-4 items-center justify-center mr-1">
                            <CheckSquare size={14} color="#2E7D32" />
                        </View>
                        <Text className="text-xs font-medium" style={{ color: '#2E7D32' }}>
                            Select
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-row items-center px-3 py-2 rounded-xl"
                        style={{ backgroundColor: 'rgba(200, 230, 201, 1)' }}
                        activeOpacity={0.7}
                    >
                        <View className="w-4 h-4 items-center justify-center mr-1">
                            <ShoppingCart size={14} color="#4CAF50" />
                        </View>
                        <Text className="text-xs font-medium" style={{ color: '#4CAF50' }}>
                            Add to Cart
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    className="w-8 h-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: '#81C784' }}
                    activeOpacity={0.7}
                >
                    <Share size={14} color="#2E7D32" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
