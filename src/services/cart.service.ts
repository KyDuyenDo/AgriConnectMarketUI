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

// ============================================
// UTILITY FUNCTIONS FOR SHIPPING CALCULATION
// ============================================

/**
 * Address type for farm locations
 */

// Allow optional id and raw shape for farm address when available
export type RawAddress = Address & {
    id?: string;
    createdAt?: string;
    isDefault?: boolean;
    isDelete?: boolean;
};

/**
 * Result of shipping calculation
 */
export interface ShippingCalculationResult {
    addresses: Address[];
    totalShippingFee: number;
}

/**
 * Extract all farm addresses from cart items
 * @param cartGroups - Array of cart farm groups
 * @returns Array of unique farm addresses
 */
export const extractFarmAddresses = (cartGroups: CartFarmGroup[]): Address[] => {
    const addresses: Address[] = [];
    const seenAddresses = new Set<string>();

    for (const group of cartGroups) {
        // Assuming all items in a group share the same farm address, check the first item
        if (!group.items || group.items.length === 0) continue;

        const firstItem = group.items[0];
        let farmAddress: any = group.farmAddress;

        // The backend might return address as array, object or JSON string. Normalize it.
        if (!farmAddress) continue;

        if (Array.isArray(farmAddress) && farmAddress.length > 0) {
            farmAddress = farmAddress[0];
        }

        if (typeof farmAddress === 'string') {
            try {
                farmAddress = JSON.parse(farmAddress);
            } catch (e) {
                // leave as string -> skip
                continue;
            }
        }

        // Create unique key to avoid duplicates. Prefer id when available.
        const addressId = farmAddress?.id || '';
        const addressKey = addressId
            ? `${addressId}`
            : `${farmAddress.province || ''}-${farmAddress.district || ''}-${farmAddress.ward || ''}-${farmAddress.detail || ''}`;

        if (!seenAddresses.has(addressKey)) {
            seenAddresses.add(addressKey);
            addresses.push({
                province: farmAddress.province || '',
                district: farmAddress.district || '',
                ward: farmAddress.ward || '',
                detail: farmAddress.detail || '',
            });
        }
    }

    return addresses;
};

/**
 * Calculate shipping fee for a single address
 * This is a placeholder - replace with actual GHTK API call
 * @param farmAddress - Farm pickup address
 * @param customerAddress - Customer delivery address  
 * @param weight - Total weight in grams
 * @returns Shipping fee in USD
 */
export const calculateShippingFee = async (
    farmAddress: Address,
    customerAddress: Address,
    weight: number
): Promise<number> => {
    // TODO: Replace with actual GHTK API call
    // For now, return a mock fee based on weight
    const baseRate = 0.5; // $0.50 base
    const perKgRate = 1.0; // $1.00 per kg
    const weightInKg = weight / 1000;

    return baseRate + (weightInKg * perKgRate);
};

/**
 * Calculate total shipping fee for all cart items
 * @param cartGroups - Cart groups with farm addresses
 * @param customerAddress - Customer delivery address
 * @returns Shipping calculation result with addresses and total fee
 */
export const calculateTotalShipping = async (
    cartGroups: CartFarmGroup[],
    customerAddress: Address
): Promise<ShippingCalculationResult> => {
    const farmAddresses = extractFarmAddresses(cartGroups);
    let totalShippingFee = 0;

    // Calculate shipping fee for each unique farm address
    for (const farmAddress of farmAddresses) {
        // Find group matching this address
        const group = cartGroups.find(g => {
            const addr = g.farmAddress;
            return addr &&
                addr.province === farmAddress.province &&
                addr.district === farmAddress.district &&
                addr.ward === farmAddress.ward &&
                addr.detail === farmAddress.detail;
        });

        if (!group) continue;

        const totalWeight = group.items.reduce((sum, item) => {
            // Assume 500g per item, adjust as needed
            return sum + (item.quantity * 500);
        }, 0);

        // Calculate shipping fee for this farm
        const fee = await calculateShippingFee(farmAddress, customerAddress, totalWeight);
        totalShippingFee += fee;
    }

    return {
        addresses: farmAddresses,
        totalShippingFee,
    };
};
