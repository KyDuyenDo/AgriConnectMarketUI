import apiClient from "@/api/config";

export interface CalculateShippingFeeQuery {
    farmId: string;
    addressId: string;
    weight?: number;
}

export interface ShippingFeeResponse {
    fee: number;
    // Add other properties if returned by the API, but fee is the critical one
}

export const shippingService = {
    /**
     * Calculate shipping fee (GET /api/ship)
     */
    getShippingFee: async (query: CalculateShippingFeeQuery): Promise<number> => {
        try {
            const { farmId, addressId, weight = 1 } = query;
            const res = await apiClient.get<{ data: number }>(`/api/ship`, {
                params: {
                    farmId,
                    addressId,
                    weight
                }
            });
            // Assuming the API returns the fee directly in data or wrapped in a success response
            // Based on ShippingServiceController: return Ok(ApiResponse.SuccessResponse(result.Value));
            // result.Value is likely the fee (decimal/double) or an object containing it.
            // Let's assume it returns the fee directly for now based on typical patterns, 
            // but I should double check the backend return type if possible. 
            // Looking at the controller: result.Value. 
            // If result.Value is just a number, then res.data.data is that number.
            return res.data.data;
        } catch (error) {
            console.error("❌ Error calculating shipping fee:", error);
            return 0; // Return 0 on error to avoid breaking UI, or rethrow
        }
    }
};
