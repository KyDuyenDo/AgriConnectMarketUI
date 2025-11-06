import { View, Text, ScrollView } from 'react-native';
import { Collection, CollectionCard } from './CollectionCard';
import AddNewButton from './AddNewButton';

const MOCK_COLLECTIONS: Collection[] = [
    {
        id: 1,
        title: 'All Favorites',
        subtitle: 'Everything',
        itemCount: 38,
        isFeatured: true,
    },
    {
        id: 2,
        title: 'Fruits',
        subtitle: 'Fresh picks',
        itemCount: 12,
        isFeatured: false,
    },
    {
        id: 3,
        title: 'Weekly Stap',
        subtitle: 'Essentials',
        itemCount: 8,
        isFeatured: false,
    },
    {
        id: 4,
        title: 'Vegetables',
        subtitle: 'Green goods',
        itemCount: 25,
        isFeatured: false,
    },
];

export function CollectionsScreen() {
    return (
        <View className="flex-1 bg-white p-1">
            {/* Hàng Tiêu đề và Nút New */}
            <View className="flex-row items-center justify-between mb-6">
                <Text className="text-3xl font-bold text-gray-800">
                    Collections
                </Text>
                <AddNewButton />
            </View>
            
            {/* Danh sách các Collections (Sử dụng ScrollView cho cuộn ngang) */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
            >
                {MOCK_COLLECTIONS.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </ScrollView>
        </View>
    );
}