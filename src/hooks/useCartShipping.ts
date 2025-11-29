import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useCalculateGHTKShipping } from './GHTK/useCalculateGHTKShipping';
import { extractFarmAddresses, CartItem, Address } from '@/services/cart.service';

interface UseCartShippingParams {
    cartItems: CartItem[];
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
}: UseCartShippingParams): UseCartShippingReturn & { shippingFeesByFarm: Record<string, number> } => {
    const [shippingFee, setShippingFee] = useState<number>(0);
    const [farmAddresses, setFarmAddresses] = useState<Address[]>([]);
    const [shippingFeesByFarm, setShippingFeesByFarm] = useState<Record<string, number>>({});

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
            setShippingFeesByFarm({});
            return;
        }

        isCalculatingRef.current = true;

        try {
            // Extract farm addresses
            const addresses = extractFarmAddresses(selectedItems);
            setFarmAddresses(addresses);

            if (addresses.length === 0) {
                console.warn('⚠️ No farm addresses found');
                setShippingFee(3.99); // Default fallback
                setShippingFeesByFarm({});
                return;
            }

            let totalFeeVND = 0;
            const newShippingFeesByFarm: Record<string, number> = {};

            // Calculate fee for each farm address
            for (const farmAddress of addresses) {
                // Filter items belonging to this farm
                const farmItems = selectedItems.filter(item => {
                    const addr = item.batch?.season?.farm?.address;
                    return addr &&
                        addr.province === farmAddress.province &&
                        addr.district === farmAddress.district &&
                        addr.ward === farmAddress.ward &&
                        addr.detail === farmAddress.detail;
                });

                if (farmItems.length === 0) continue;

                // Use farm name or ID as key for the fee map. 
                // Ideally we should use Farm ID, but here we are grouping by address.
                // Let's use the first item's farm name as a key for now, or we can use the address string.
                // Better yet, let's try to get the Farm ID if possible, but the extraction logic is address based.
                // Let's use the farm name from the first item of this group as the key, assuming 1 farm per address for now, 
                // or just map by Farm Name if that's how we group in UI.
                const farmName = farmItems[0]?.batch?.season?.farm?.farmName || "Unknown Farm";

                // Calculate metrics for this farm's shipment
                const farmWeight = farmItems.reduce((sum, item) => sum + (item.quantity * 500), 0);
                const farmSubtotalUSD = farmItems.reduce((sum, item) => sum + (item.itemPrice * item.quantity), 0);
                const farmValueVND = Math.round(farmSubtotalUSD * 24000);

                console.log(`📦 Calculating GHTK fee for farm ${farmName} in ${farmAddress.province}:`, {
                    to: customerAddress.province,
                    items: farmItems.length,
                    weight: farmWeight,
                    valueVND: farmValueVND
                });

                let farmFeeVND = 0;

                try {
                    // Call GHTK API for this farm
                    const result = await calculateGHTKFee({
                        pick_province: farmAddress.province,
                        pick_district: farmAddress.district,
                        province: customerAddress.province,
                        district: customerAddress.district,
                        address: customerAddress.detail || '',
                        weight: farmWeight,
                        value: farmValueVND,
                        transport: 'road',
                    });

                    if (result?.fee?.fee) {
                        console.log(`✅ Fee for farm ${farmName}: ${result.fee.fee} VND`);
                        farmFeeVND = result.fee.fee;
                    } else {
                        farmFeeVND = 30000; // Fallback per farm
                    }
                } catch (innerErr) {
                    console.error(`❌ Failed to calculate for farm ${farmName}:`, innerErr);
                    farmFeeVND = 30000;
                }

                totalFeeVND += farmFeeVND;

                // Convert to USD for the map
                const farmFeeUSD = Math.round((farmFeeVND / 24000) * 100) / 100;
                newShippingFeesByFarm[farmName] = farmFeeUSD;
            }

            if (totalFeeVND > 0) {
                const totalFeeUSD = Math.round((totalFeeVND / 24000) * 100) / 100; // round to 2 decimals
                console.log(`💰 Total Shipping Fee: ${totalFeeVND} VND = $${totalFeeUSD.toFixed(2)}`);
                setShippingFee(totalFeeUSD);
            } else {
                setShippingFee(3.99);
            }

            setShippingFeesByFarm(newShippingFeesByFarm);

        } catch (err) {
            console.error('❌ Global calculation error:', err);
            setShippingFee(3.99);
            setShippingFeesByFarm({});
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
            setShippingFeesByFarm({});
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
        shippingFeesByFarm,
    };
};
