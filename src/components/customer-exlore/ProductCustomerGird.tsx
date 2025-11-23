import type React from "react"
import { View, Alert } from "react-native"
import { ProductCard } from "../ui/ProductCard"
import { Product } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useAddToCart, useCart } from "@/hooks/useCart"

interface ProductGridProps {
    searchQuery: string
    products: Product[]
}


export const ProductCustomerGrid: React.FC<ProductGridProps> = ({ searchQuery, products }) => {
    const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>()
    const { data: cart } = useCart();
    const addToCartMutation = useAddToCart();

    const handleAddToCart = (product: Product) => {
        if (!cart?.id) {
            Alert.alert("Error", "Cart not initialized or user not logged in.");
            return;
        }

        addToCartMutation.mutate(
            {
                cartId: cart.id,
                batchId: product.id, // Assuming product.id is batchId as analyzed
                quantity: 1,
            },
            {
                onSuccess: () => {
                    Alert.alert("Success", `Added ${product.name} to cart!`);
                },
                onError: (error: any) => {
                    Alert.alert("Error", "Failed to add to cart. " + (error.message || ""));
                }
            }
        );
    };

    return (
        <View className="px-4 mb-4">
            <View
                className="flex-row flex-wrap"
                style={{ gap: 12 }}
            >
                {products.map((product) => (
                    <View key={product.id} style={{ width: '48%' }}>
                        <ProductCard
                            product={product}
                            toggleFavorite={() => { }}
                            onPress={() => navigation.navigate("BatchDetails", { batchId: product.id })}
                            onAddToCart={() => handleAddToCart(product)}
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}
