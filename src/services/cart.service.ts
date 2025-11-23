import apiClient from "@/api/config";
import { ProductBatch } from "@/types";

export interface CartItemResponse {
    id: string;
    cartId: string;
    batchId: string;
    quantity: number;
    itemPrice: number;
    batch?: ProductBatch;
}

export interface CartResponse {
    id: string;
    customerId: string;
    totalPrice: number;
    cartItems: CartItemResponse[];
}

export interface AddToCartRequest {
    cartId: string;
    batchId: string;
    quantity: number;
}

export interface UpdateCartItemRequest {
    batchId: string;
    quantity: number;
}

const BASE_URL = "/api/carts";

export const CartService = {
    /**
     * Get current user's cart (GET /api/carts/me)
     */
    getCart: async (): Promise<CartResponse | null> => {
        try {
            const res = await apiClient.get<any>(`${BASE_URL}/me`);
            // Backend returns: { success: true, data: { isSuccess: true, value: { ... } } }
            if (res.data?.success && res.data?.data?.isSuccess) {
                return res.data.data.value;
            }
            return null;
        } catch (error: any) {
            console.error("❌ Error fetching cart:", error);
            if (error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    },

    /**
     * Add item to cart (POST /api/carts)
     */
    addItem: async (item: AddToCartRequest): Promise<CartItemResponse> => {
        try {
            console.log("📦 Adding item to cart:", item);
            const res = await apiClient.post<{ data: CartItemResponse }>(`${BASE_URL}`, item);
            console.log("✅ Item added successfully:", res.data);
            return res.data.data;
        } catch (error) {
            console.error("❌ Error adding item to cart:", error);
            throw error;
        }
    },

    /**
     * Update cart item (PATCH /api/carts/{cartId})
     */
    updateItem: async (cartId: string, data: UpdateCartItemRequest): Promise<CartItemResponse> => {
        try {
            const res = await apiClient.patch<{ data: CartItemResponse }>(`${BASE_URL}/${cartId}`, data);
            return res.data.data;
        } catch (error) {
            console.error(`❌ Error updating cart item:`, error);
            throw error;
        }
    },

    /**
     * Remove item from cart (DELETE /api/carts/cart-items/{itemId})
     */
    removeItem: async (itemId: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/cart-items/${itemId}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Error removing item ${itemId}:`, error);
            throw error;
        }
    },

    /**
     * Clear cart (Not implemented in backend yet based on analysis, but keeping placeholder)
     */
    clearCart: async (): Promise<boolean> => {
        // Backend doesn't seem to have a clear cart endpoint based on my analysis of CartController.cs
        // But I'll leave this here if it was intended.
        console.warn("clearCart not implemented in backend");
        return false;
    },
};

export default CartService;
