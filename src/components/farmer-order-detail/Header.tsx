import { View, Text, Pressable } from 'react-native';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';

interface HeaderProps {
    onBack?: () => void;
    onMenu?: () => void;
}

export function Header({ onBack, onMenu }: HeaderProps) {
    return (
        <View
            className="bg-white"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 3,
                elevation: 2
            }}
        >
            <View style={{ height: 0 }} />

            <View className="flex-row justify-between items-center h-14 px-4">
                <Pressable
                    onPress={onBack}
                    className="flex-row items-center gap-2"
                >
                    <View className="w-5 h-5 items-center justify-center">
                        <ChevronLeft size={20} color="#4CAF50" />
                    </View>
                    <Text className="text-base font-semibold" style={{ color: '#4CAF50' }}>
                        Back
                    </Text>
                </Pressable>

                <Text className="text-lg font-semibold" style={{ color: '#1B1F24' }}>
                    Order Details
                </Text>

                <Pressable
                    onPress={onMenu}
                    className="w-10 h-10 items-center justify-center rounded-full active:bg-[#F5F7F5]"
                >
                    <MoreVertical size={20} color="#6B737A" />
                </Pressable>
            </View>
        </View>
    );
}
