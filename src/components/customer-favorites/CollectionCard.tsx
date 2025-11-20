import { View, Text, TouchableOpacity } from 'react-native';

export interface Collection {
    id: number;
    title: string;
    subtitle: string;
    itemCount: number;
    isFeatured: boolean;
}

interface CollectionCardProps {
    collection: Collection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
    const { title, subtitle, itemCount, isFeatured } = collection;

    const cardStyle = isFeatured
        ? { backgroundColor: '#4CAF50' }
        : {
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3
        };

    const titleColor = isFeatured ? '#FFFFFF' : '#1B1F24';
    const subtitleColor = isFeatured ? 'rgba(255, 255, 255, 0.8)' : '#6B737A';
    const badgeStyle = isFeatured
        ? { backgroundColor: '#FFFFFF' }
        : { backgroundColor: 'rgba(200, 230, 201, 1)' };
    const badgeTextColor = '#4CAF50';

    return (
        <TouchableOpacity
            className="min-w-[120px] p-4 rounded-2xl"
            style={cardStyle}
            activeOpacity={0.8}
        >
            <View
                className="px-3 py-1.5 rounded-full mb-2 self-start"
                style={badgeStyle}
            >
                <Text className="text-xs font-medium" style={{ color: badgeTextColor }}>
                    {itemCount} items
                </Text>
            </View>

            <Text className="text-sm font-semibold mb-1" style={{ color: titleColor }}>
                {title}
            </Text>
            <Text className="text-xs" style={{ color: subtitleColor }}>
                {subtitle}
            </Text>
        </TouchableOpacity>
    );
};
