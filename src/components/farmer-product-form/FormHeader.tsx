import { View, Text, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface FormHeaderProps {
    title: string;
    onBack?: () => void;
}

export function FormHeader({ title, onBack }: FormHeaderProps) {
    return (
        <View
            className="bg-white"
            style={{ backgroundColor: '#FFF8F0' }}
        >
            <View style={{ height: 0 }} />

            <View
                className="flex-row justify-between items-center h-14 px-6"
                style={{ backgroundColor: '#FFFFFF' }}
            >
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

                <Text className="text-[20px] font-semibold" style={{ color: '#2D2D2D' }}>
                    {title}
                </Text>

                <View className="w-10 h-10" />
            </View>
        </View>
    );
}
