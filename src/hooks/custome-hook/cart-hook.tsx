import { useAddToCart, useCart, useRemoveFromCart } from "@/hooks/useCart";
import { Alert } from "react-native";

/**
 * Custom hook để xử lý thêm sản phẩm vào giỏ hàng
 */
export const useHandleAddToCart = () => {
    const { data: cart } = useCart();
    const { mutate: addToCart, isPending } = useAddToCart();
    const { mutate: removeFromCart, isPending: isDeleting } = useRemoveFromCart();

    const handleAddToCart = (batchId: string) => {
        if (!cart?.cartItems) {
            console.error("❌ Không tìm thấy giỏ hàng");
            Alert.alert("Error", "Cart not found or user not logged in.");
            return;
        }

        if (!batchId) {
            console.error("❌ Không tìm thấy batchId");
            return;
        }

        console.log("🛒 Thêm vào giỏ hàng:", { cartId: cart.cartId, batchId });

        addToCart(
            {
                cartId: cart.cartId,
                batchId: batchId,
                quantity: 1
            },
            {
                onSuccess: (data) => {
                    console.log("✅ Đã thêm sản phẩm vào giỏ hàng", data);
                    Alert.alert("Success", "Added to cart!");
                },
                onError: (error: any) => {
                    console.error("❌ Lỗi thêm sản phẩm vào giỏ hàng:", error);
                    Alert.alert("Error", "Failed to add to cart. " + (error.message || ""));
                }
            }
        );
    };

    const handleDelete = (id: string) => {
        if (!id) {
            console.error("❌ Không tìm thấy ID sản phẩm");
            return;
        }

        console.log("🗑️ Xóa sản phẩm khỏi giỏ hàng:", id);

        removeFromCart(id, {
            onSuccess: () => {
                console.log("✅ Đã xóa sản phẩm khỏi giỏ hàng");
            },
            onError: (error) => {
                console.error("❌ Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
            }
        });
    }

    return {
        handleAddToCart,
        handleDelete,
        isPending,
        isDeleting,
        cartId: cart?.cartId
    };
};
