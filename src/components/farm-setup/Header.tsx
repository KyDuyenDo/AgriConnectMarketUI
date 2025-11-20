import { View, Text, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface HeaderProps {
    onBack?: () => void;
    onSave?: () => void;
}

export function Header({ onBack, onSave }: HeaderProps) {
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
            <View style={{ height: 0 }} /> {/* Safe area top placeholder */}

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
                    Farm Setup
                </Text>

                <Pressable
                    onPress={onSave}
                    className="py-2 px-4"
                >
                    <Text className="text-sm font-semibold" style={{ color: '#4CAF50' }}>
                        Save
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
