import apiClient from "@/api/config";



export interface Customer {
    id: string;
    fullname: string;
    phone: string;
    email: string;
}

export interface ResponseCart {
    success: boolean;
    message: string;
    data: {
        cartId: string;
        totalPrice: number;
        fullname: string;
        email: string;
        phone: string;
        cartItems: CartFarmGroup[];
    };
}

export interface CartValue {
    customerId: string;
    totalPrice: number;
    customer: Customer;
    cartItems: CartFarmGroup[];
    cartId: string;
}

export interface CartFarmGroup {
    farmId: string;
    farmName: string;
    farmAddress: Address;
    items: CartItem[];
}

export interface Customer {
    fullname: string;
    email: string;
    phone: string;
    avatarUrl: string;
    accountId: string;
    createdAt: string;
    id: string;
}

export type CartItem = {
    itemId: string;
    batchId: string;
    batchCode: string;
    batchImageUrls: string[];
    productName: string;
    categoryName: string;
    seasonName: string;
    batchPrice: number;
    quantity: number;
    units: string;
    itemPrice: number;
    seasonStatus: string;
};


export interface Batch {
    batchCode: {
        value: string;
    };
    totalYield: number;
    availableQuantity: number;
    units: string;
    price: number;
    plantingDate: string;
    harvestDate: string;
    imagesUrl: string[];
    seasonId: string;
    season: Season;
    productId: string;
    product: Product;
    productBatches: (ProductBatch | null)[];
    createdAt: string;
    id: string;
}

export interface Season {
    seasonName: string;
    seasonDesc: string;
    status: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    farmId: string;
    farm: Farm;
    productId?: string;
    productBatches?: ProductBatch[];
    id: string;
}

export interface Farm {
    farmName: string;
    batchCodePrefix: string;
    bannerUrl: string;
    phone: string;
    area: string;
    isDelete: boolean;
    isBanned: boolean;
    isValidForSelling: boolean;
    isConfirmAsMall: boolean;
    createdAt: string;
    farmerId: string;
    addressId: string;
    address: Address;
    seasons: (Season | null)[];
    history: FarmHistory[];
    id: string;
}

export interface Address {
    province: string;
    district: string;
    ward: string;
    detail: string;
    isDefault?: boolean;
    createdAt?: string;
    id?: string;
}

export interface FarmHistory {
    year: string;
    title: string;
    description: string;
    color: string;
}

export interface Product {
    productName: string;
    productAttribute: string;
    productDesc: string;
    categoryId: string;
    category: Category;
    seasons: (Season | null)[];
    createdAt: string;
    id: string;
}

export interface Category {
    categoryName: string;
    categoryDesc: string;
    illustrativeImageUrl: string;
    isDelete: boolean;
    products: (Product | null)[];
    id: string;
}

export interface ProductBatch {
    batchCode: {
        value: string;
    };
    totalYield: number;
    availableQuantity: number;
    units: string;
    price: number;
    plantingDate: string;
    harvestDate: string;
    imagesUrl: string[];
    seasonId: string;
    createdAt: string;
    id: string;
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
    getCart: async () => {
        try {
            const res = await apiClient.get<ResponseCart>(`${BASE_URL}/me`);
            // Backend returns: { success: true, data: { isSuccess: true, value: { ... } } }
            if (res.data?.success) {
                return res.data.data;
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
    addItem: async (item: AddToCartRequest): Promise<CartItem> => {
        try {
            console.log("📦 Adding item to cart:", item);
            const res = await apiClient.post<{ data: CartItem }>(`${BASE_URL}`, item);
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
    updateItem: async (cartId: string, data: UpdateCartItemRequest): Promise<CartItem> => {
        try {
            const res = await apiClient.patch<{ data: CartItem }>(`${BASE_URL}/${cartId}`, data);
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


