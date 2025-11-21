import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CartService from "@/services/cart.service";
import { CartItem } from "@/types";

// Query Keys
const CART_QUERY_KEYS = {
    cart: ["cart"] as const,
};

// ======================================================
// 1️⃣ GET CART
// ======================================================
export const useCart = () => {
    return useQuery<CartItem[]>({
        queryKey: CART_QUERY_KEYS.cart,
        queryFn: () => CartService.getCart(),
    });
};

// ======================================================
// 2️⃣ ADD TO CART
// ======================================================
export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (item: Partial<CartItem>) => CartService.addItem(item),

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
        mutationFn: ({ id, updates }: { id: string; updates: Partial<CartItem> }) =>
            CartService.updateItem(id, updates),

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
        mutationFn: (id: string) => CartService.removeItem(id),

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
