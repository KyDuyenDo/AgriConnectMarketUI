import React from "react";
import { ScrollView, View, Text, Pressable, Image } from "react-native";
import { Category } from "@/types";
import { Leaf, Grid } from "lucide-react-native";

interface CategorySelectorProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelectCategory: (categoryId: string | null) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    return (
        <View className="px-4 mb-4">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-[16px] font-semibold" style={{ color: '#1B1F24' }}>
                    Categories
                </Text>
                <Text className="text-[12px] font-medium" style={{ color: '#4CAF50' }}>
                    View All
                </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3 pb-2">
                {/* "View All" Option */}
                <View className="flex-col items-center" style={{ minWidth: 60 }}>
                    <Pressable
                        onPress={() => onSelectCategory(null)}
                        className="w-12 h-12 items-center justify-center mb-2"
                        style={{
                            backgroundColor: selectedCategory === null ? '#4CAF50' : '#FFF5EB',
                            borderWidth: selectedCategory === null ? 0 : 1,
                            borderColor: '#E8E8E8',
                            borderRadius: 16,
                            shadowColor: selectedCategory === null ? '#4CAF50' : 'transparent',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 12,
                            elevation: selectedCategory === null ? 4 : 0
                        }}
                    >
                        <Grid size={24} color={selectedCategory === null ? '#FFFFFF' : '#4CAF50'} />
                    </Pressable>
                    <Text className="text-[10px] font-medium" style={{ color: '#1B1F24' }}>
                        All Products
                    </Text>
                </View>

                {/* Dynamic Categories */}
                {categories.map((category) => (
                    <View key={category.id} className="flex-col items-center" style={{ minWidth: 60 }}>
                        <Pressable
                            onPress={() => onSelectCategory(category.id)}
                            className="w-12 h-12 items-center justify-center mb-2 overflow-hidden"
                            style={{
                                backgroundColor: selectedCategory === category.id ? '#4CAF50' : '#FFF5EB',
                                borderWidth: selectedCategory === category.id ? 0 : 1,
                                borderColor: '#E8E8E8',
                                borderRadius: 16,
                                shadowColor: selectedCategory === category.id ? '#4CAF50' : 'transparent',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 12,
                                elevation: selectedCategory === category.id ? 4 : 0
                            }}
                        >
                            {category.illustrativeImageUrl ? (
                                <Image
                                    source={{ uri: category.illustrativeImageUrl }}
                                    className="w-full h-full"
                                    style={{ resizeMode: 'cover' }}
                                />
                            ) : (
                                <Leaf size={24} color={selectedCategory === category.id ? '#FFFFFF' : '#4CAF50'} />
                            )}
                        </Pressable>
                        <Text className="text-[10px] font-medium text-center" numberOfLines={2} style={{ color: '#1B1F24', maxWidth: 64 }}>
                            {category.categoryName}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
