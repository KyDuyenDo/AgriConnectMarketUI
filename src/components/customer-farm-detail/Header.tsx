import { View, Text, Pressable } from 'react-native';
import { ChevronLeft, Share, Heart } from 'lucide-react-native';

interface HeaderProps {
    onBack?: () => void;
    onShare?: () => void;
    onFavorite?: () => void;
    isFavorited?: boolean;
}

export function Header({ onBack, onShare, onFavorite, isFavorited }: HeaderProps) {
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

                <View className="flex-row items-center gap-3">
                    <Text className="text-[20px] font-semibold" style={{ color: '#1B1F24' }}>
                        Farm Details
                    </Text>
                </View>

                <View className="flex-row items-center gap-2">
                    <Pressable
                        onPress={onShare}
                        className="w-10 h-10 items-center justify-center rounded-full active:bg-[#E8EAEB]"
                        style={{ backgroundColor: '#F5F7F5' }}
                    >
                        <Share size={20} color="#6B737A" />
                    </Pressable>

                    <Pressable
                        onPress={onFavorite}
                        className="w-10 h-10 items-center justify-center rounded-full active:bg-[#E8EAEB]"
                        style={{ backgroundColor: '#F5F7F5' }}
                    >
                        <Heart
                            size={20}
                            color="#FFA726"
                            fill={isFavorited ? "#FFA726" : "none"}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
