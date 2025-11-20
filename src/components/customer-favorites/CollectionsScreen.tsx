import { View, Text, ScrollView } from 'react-native';
import { Collection, CollectionCard } from './CollectionCard';
import AddNewButton from './AddNewButton';


interface CollectionsScreenProps {
    collections: Collection[];
}

export function CollectionsScreen({ collections }: CollectionsScreenProps) {
    return (
        <View className="mb-4 px-4">
            {/* Section Header */}
            <View className="flex-row items-center justify-between mb-3">
                <Text className="text-[16px] font-semibold" style={{ color: '#1B1F24' }}>
                    Collections
                </Text>
                <AddNewButton />
            </View>

            {/* Collections List - Horizontal Scroll */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row pb-2"
                contentContainerStyle={{ gap: 12 }}
            >
                {collections?.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </ScrollView>
        </View>
    );
}
