import { View, Text, Pressable } from 'react-native';
import { ArrowLeft, MoreHorizontal } from 'lucide-react-native';

interface HeaderProps {
    onBack?: () => void;
    onMenu?: () => void;
}

export function Header({ onBack, onMenu }: HeaderProps) {
    return (
        <View>
            <View className="flex-row justify-between items-center h-14 px-4">
                <Pressable
                    onPress={onBack}
                    className="flex-row items-center gap-2"
                >
                    <View className="w-5 h-5 items-center justify-center">
                        <ArrowLeft size={20} color="#4CAF50" />
                    </View>
                </Pressable>

                <Text className="text-lg font-semibold" style={{ color: '#1B1F24' }}>
                    Product Details
                </Text>

                <View/>
            </View>
        </View>
    );
}
