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

    const cardClasses = isFeatured 
        ? 'bg-green-500' 
        : 'bg-white border border-gray-100';

    const titleClasses = isFeatured 
        ? 'text-white text-xl font-bold' 
        : 'text-gray-900 text-xl font-bold';

    const subtitleClasses = isFeatured 
        ? 'text-white/80 text-base font-normal' 
        : 'text-gray-500 text-base font-normal';

    const itemTagClasses = isFeatured 
        ? 'bg-white text-green-600' 
        : 'bg-green-100 text-green-600';
        
    return (
        <TouchableOpacity 
            className={`w-40 p-4 rounded-3xl mr-3 ${cardClasses}`}
            activeOpacity={0.8}
        >
            <View 
                className={`w-auto p-2 rounded-full mb-4 self-start ${itemTagClasses}`}
            >
                <Text className="text-sm font-semibold">
                    {itemCount} items
                </Text>
            </View>

            {/* Nội dung chính */}
            <Text className={`mt-auto ${titleClasses}`}>
                {title}
            </Text>
            <Text className={subtitleClasses}>
                {subtitle}
            </Text>
        </TouchableOpacity>
    );
};
