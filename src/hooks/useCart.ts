import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CartService, { AddToCartRequest, UpdateCartItemRequest } from "@/services/cart.service";
import BatchService from "@/services/batches.service";

export const CART_QUERY_KEYS = {
    cart: ["cart"] as const,
};

export const useCart = () => {
    return useQuery({
        queryKey: CART_QUERY_KEYS.cart,
        queryFn: async () => {
            const cart = await CartService.getCart();
            return cart;
        },
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (item: AddToCartRequest) => CartService.addItem(item),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
        },
    });
};

// ======================================================
// 3️⃣ UPDATE CART ITEM
// ======================================================
export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cartId, data }: { cartId: string; data: UpdateCartItemRequest }) =>
            CartService.updateItem(cartId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
        },
    });
};

// ======================================================
// 4️⃣ REMOVE FROM CART
// ======================================================
export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: string) => CartService.removeItem(itemId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
        },
    });
};

// ======================================================
// 5️⃣ CLEAR CART
// ======================================================
export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => CartService.clearCart(),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart });
        },
    });
};
