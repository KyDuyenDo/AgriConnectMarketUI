import { useState, useCallback } from 'react';
import axios from 'axios';

// GHTK API configuration
const GHTK_BASE_URL = "https://services.giaohangtietkiem.vn/services/shipment/fee";
// TODO: Get token from GHTK dashboard  
const GHTK_TOKEN = "YOUR_GHTK_TOKEN_HERE";

interface GHTKFeePayload {
    pick_province: string;      // Tỉnh/thành lấy hàng
    pick_district: string;       // Quận/huyện lấy hàng
    province: string;            // Tỉnh/thành giao hàng
    district: string;            // Quận/huyện giao hàng
    address?: string;            // Địa chỉ giao hàng
    weight: number;              // Khối lượng (gram)
    value?: number;              // Giá trị đơn hàng (VND)
    transport?: string;          // Loại vận chuyển: "road" (bộ), "fly" (bay)
    deliver_option?: string;     // "none" hoặc "xteam"
    tags?: number[];             // Mã dịch vụ đặc biệt
}

interface GHTKFeeResponse {
    success: boolean;
    message: string;
    fee: {
        name: string;
        fee: number;              // Phí vận chuyển
        insurance_fee: number;    // Phí bảo hiểm
        include_vat: string;      // "Đã bao gồm VAT" 
        cost_id: string;
        delivery: boolean;
        delivery_value: number;
    };
}

export function useCalculateGHTKShipping() {
    const [loading, setLoading] = useState(false);
    const [feeResult, setFeeResult] = useState<GHTKFeeResponse | null>(null);
    const [error, setError] = useState<any>(null);

    const calculate = useCallback(async (payload: GHTKFeePayload) => {
        setLoading(true);
        setError(null);
        setFeeResult(null);

        console.log('GHTK Fee calculation payload:', payload);

        try {
            const response = await axios.get<GHTKFeeResponse>(
                GHTK_BASE_URL,
                {
                    params: payload,
                    headers: {
                        'Token': GHTK_TOKEN,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('GHTK Fee calculation response:', response.data);

            if (response.data.success) {
                setFeeResult(response.data);
                return response.data;
            } else {
                throw new Error(response.data.message || "Failed to calculate shipping fee");
            }
        } catch (e: any) {
            const errorMsg = e.response?.data || e.message;
            setError(errorMsg);
            console.error("GHTK shipping fee calculation error:", e);
            console.error("Error details:", e.response?.data);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        calculate,
        loading,
        feeResult,
        error,
    };
}
