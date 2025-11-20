import { View, Image, Text } from 'react-native';

interface Badge {
    type: 'organic' | 'lowStock';
    label: string;
}

interface ProductHeroProps {
    image: string;
    badges: Badge[];
}

export function ProductHero({ image, badges }: ProductHeroProps) {
    const getBadgeStyle = (type: Badge['type']) => {
        if (type === 'organic') {
            return {
                backgroundColor: 'rgba(200, 230, 201, 1)',
                textColor: '#2E7D32'
            };
        }
        return {
            backgroundColor: 'rgba(255, 224, 178, 1)',
            textColor: '#F57C00'
        };
    };

    return (
        <View className="relative" style={{ aspectRatio: 4 / 3 }}>
            <Image
                source={{ uri: image }}
                className="w-full h-full"
                resizeMode="cover"
            />

            {badges.map((badge, index) => {
                const style = getBadgeStyle(badge.type);
                const isFirst = index === 0;

                return (
                    <View
                        key={badge.type}
                        className={`absolute ${isFirst ? 'top-4' : 'bottom-4'} right-4 flex-row items-center px-3 py-1 rounded-full gap-1`}
                        style={{ backgroundColor: style.backgroundColor }}
                    >
                        <Text className="text-xs font-medium" style={{ color: style.textColor }}>
                            {badge.label}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}
