import { useAddToCart, useCart, useRemoveFromCart } from "@/hooks/useCart";

/**
 * Custom hook để xử lý thêm sản phẩm vào giỏ hàng
 */
export const useHandleAddToCart = () => {
    const { data: Cart } = useCart();
    const { mutate: addToCart, isPending } = useAddToCart();
    const { mutate: removeFromCart, isPending: isDeleting } = useRemoveFromCart();

    const handleAddToCart = (batchId: string) => {
        if (!Cart?.value?.id) {
            console.error("❌ Không tìm thấy giỏ hàng");
            return;
        }

        if (!batchId) {
            console.error("❌ Không tìm thấy batchId");
            return;
        }

        console.log("🛒 Thêm vào giỏ hàng:", { cartId: Cart?.value?.id, batchId });

        addToCart(
            {
                cartId: Cart?.value?.id,
                batchId: '7b1b13fa-f00c-4f2b-a0b1-12086275428d',
                quantity: 1
            },
            {
                onSuccess: (data) => {
                    console.log("✅ Đã thêm sản phẩm vào giỏ hàng", data);
                },
                onError: (error) => {
                    console.error("❌ Lỗi thêm sản phẩm vào giỏ hàng:", error);
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
        cartId: Cart?.value?.id
    };
};
