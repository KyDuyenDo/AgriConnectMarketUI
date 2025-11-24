import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useCalculateGHTKShipping } from './GHTK/useCalculateGHTKShipping';
import { extractFarmAddresses, CartItemResponse, Address } from '@/services/cart.service';

interface UseCartShippingParams {
    cartItems: CartItemResponse[];
    selectedItemIds: string[];
    customerAddress?: Address | null;
}

interface UseCartShippingReturn {
    shippingFee: number;
    isCalculating: boolean;
    farmAddresses: Address[];
    error: any;
}

/**
 * Custom hook to calculate shipping fees for cart items
 * Uses useCallback to memoize calculation function
 */
export const useCartShipping = ({
    cartItems,
    selectedItemIds,
    customerAddress,
}: UseCartShippingParams): UseCartShippingReturn => {
    const [shippingFee, setShippingFee] = useState<number>(0);
    const [farmAddresses, setFarmAddresses] = useState<Address[]>([]);

    const { calculate: calculateGHTKFee, loading: isCalculating, error } = useCalculateGHTKShipping();

    // Track calculation state
    const isCalculatingRef = useRef(false);

    // Memoize selected items
    const selectedItems = useMemo(() => {
        return cartItems.filter(item => selectedItemIds.includes(item.id));
    }, [cartItems, selectedItemIds]);

    // Memoize calculation function with useCallback
    const performCalculation = useCallback(async () => {
        // Skip if already calculating
        if (isCalculatingRef.current) {
            console.log('⏭️ Skip: Already calculating');
            return;
        }

        // Reset if no data
        if (!customerAddress || selectedItems.length === 0) {
            setShippingFee(0);
            setFarmAddresses([]);
            return;
        }

        isCalculatingRef.current = true;

        try {
            // Extract farm addresses
            const addresses = extractFarmAddresses(selectedItems);
            setFarmAddresses(addresses);

            if (addresses.length === 0) {
                console.warn('⚠️ No farm addresses found');
                setShippingFee(3.99);
                return;
            }

            const firstFarmAddress = addresses[0];

            // Calculate metrics
            const totalWeight = selectedItems.reduce((sum, item) => sum + (item.quantity * 500), 0);
            const subtotal = selectedItems.reduce((sum, item) => sum + (item.itemPrice * item.quantity), 0);

            console.log('📦 Calculating GHTK fee:', {
                from: firstFarmAddress.province,
                to: customerAddress.province,
                items: selectedItems.length,
                weight: totalWeight
            });

            // Call GHTK API
            const result = await calculateGHTKFee({
                pick_province: firstFarmAddress.province,
                pick_district: firstFarmAddress.district,
                province: customerAddress.province,
                district: customerAddress.district,
                address: customerAddress.detail || '',
                weight: totalWeight,
                value: Math.round(subtotal * 24000),
                transport: 'road',
            });

            if (result?.fee?.fee) {
                const feeInUSD = result.fee.fee / 24000;
                console.log(`✅ Fee: ${result.fee.fee} VND = $${feeInUSD.toFixed(2)}`);
                setShippingFee(feeInUSD);
            } else {
                setShippingFee(3.99);
            }
        } catch (err) {
            console.error('❌ Calculation failed:', err);
            setShippingFee(3.99);
        } finally {
            isCalculatingRef.current = false;
        }
    }, [selectedItems, customerAddress, calculateGHTKFee]); // ← Dependencies here

    // Create stable calculation trigger key
    const calculationKey = useMemo(() => {
        const itemsKey = selectedItems.map(i => `${i.id}-${i.quantity}`).sort().join('|');
        const addressKey = customerAddress
            ? `${customerAddress.province}:${customerAddress.district}:${customerAddress.ward}`
            : '';
        return itemsKey && addressKey ? `${itemsKey}__${addressKey}` : '';
    }, [selectedItems, customerAddress]);

    // Track previous key to prevent duplicate calculations
    const prevKeyRef = useRef<string>('');

    // Effect triggered only when calculationKey changes
    useEffect(() => {
        // Skip if same key (already calculated)
        if (calculationKey === prevKeyRef.current) {
            return;
        }

        // Skip if no meaningful data
        if (!calculationKey) {
            setShippingFee(0);
            setFarmAddresses([]);
            return;
        }

        // Update tracked key
        prevKeyRef.current = calculationKey;

        // Trigger calculation
        console.log('🔄 Trigger: Key changed');
        performCalculation();

    }, [calculationKey, performCalculation]); // performCalculation is now stable via useCallback

    return {
        shippingFee,
        isCalculating,
        farmAddresses,
        error,
    };
};
