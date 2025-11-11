import { View, Text, ScrollView } from 'react-native';
import { Collection, CollectionCard } from './CollectionCard';
import AddNewButton from './AddNewButton';


interface CollectionsScreenProps {
    collections: Collection[];
}

export function CollectionsScreen({ collections }: CollectionsScreenProps) {
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
                {collections?.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </ScrollView>
        </View>
    );
}
