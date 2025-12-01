import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CartService, { AddToCartRequest, UpdateCartItemRequest } from "@/services/cart.service";

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

        onMutate: async ({ data }) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: CART_QUERY_KEYS.cart });

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData(CART_QUERY_KEYS.cart);

            // Optimistically update to the new value
            queryClient.setQueryData(CART_QUERY_KEYS.cart, (old: any) => {
                if (!old) return old;

                const newCart = { ...old };

                // Deep clone cartItems to avoid mutating state directly
                newCart.cartItems = newCart.cartItems.map((group: any) => ({
                    ...group,
                    items: group.items.map((item: any) => {
                        if (item.batchId === data.batchId) {
                            return { ...item, quantity: data.quantity };
                        }
                        return item;
                    }),
                }));

                return newCart;
            });

            // Return a context object with the snapshotted value
            return { previousCart };
        },

        onError: (err, newTodo, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousCart) {
                queryClient.setQueryData(CART_QUERY_KEYS.cart, context.previousCart);
            }
        },

        onSettled: () => {
            // Always refetch after error or success:
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
