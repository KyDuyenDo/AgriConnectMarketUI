import { View, Image, Text } from 'react-native';

interface FarmHeroProps {
    image: string;
    badge?: string;
}

export function FarmHero({ image, badge }: FarmHeroProps) {
    return (
        <View className="relative h-[220px] rounded-[24px] overflow-hidden mb-4 mx-4">
            <Image
                source={{ uri: image }}
                className="w-full h-full"
                style={{ filter: 'brightness(95%)' }}
                resizeMode="cover"
            />

            {badge && (
                <View
                    className="absolute top-4 left-4 px-3 py-1 rounded-full flex-row items-center"
                    style={{ backgroundColor: 'rgba(200, 230, 201, 1)' }}
                >
                    <Text className="text-xs font-medium" style={{ color: '#2E7D32' }}>
                        {badge}
                    </Text>
                </View>
            )}
        </View>
    );
}
