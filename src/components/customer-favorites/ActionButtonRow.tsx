import { View, Text, TouchableOpacity } from 'react-native';
import { ShoppingCart, Check, Upload } from 'lucide-react-native'; 

export function ActionButtonRow() {
    return (
    
        <View className="p-3 bg-white rounded-xl  flex-row items-center justify-between">
            <View className="flex-row items-center justify-between">
                

                <TouchableOpacity
                    className="flex-row items-center justify-center p-3 rounded-2xl bg-green-500 mr-2 flex-grow-0"
                    activeOpacity={0.7}
                >
                    <Check size={18} color="white" className="mr-1" />
                    <Text className="text-white text-base font-semibold">
                        Select
                    </Text>
                </TouchableOpacity>

      
                <TouchableOpacity
                    className="flex-row items-center justify-center p-3 rounded-2xl bg-green-200/80 flex-grow"
                    activeOpacity={0.7}
                >
                    <ShoppingCart size={18} color="#4ade80" className="mr-2" />
                    <Text className="text-green-600 text-base font-semibold">
                        Add to Cart
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center justify-center w-12 h-12 rounded-xl bg-green-400 ml-2"
                    activeOpacity={0.7}
                >
                    <Upload size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
