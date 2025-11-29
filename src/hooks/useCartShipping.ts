import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useCalculateGHTKShipping } from './GHTK/useCalculateGHTKShipping';
import { extractFarmAddresses, CartItem, Address } from '@/services/cart.service';

interface UseCartShippingParams {
    cartItems: CartItem[];
    selectedItemIds: string[];
    customerAddress?: Address | null;
}

interface FarmShippingFee {
    fee: number;
    farmId: string;
}

interface UseCartShippingReturn {
    shippingFee: number;
    isCalculating: boolean;
    farmAddresses: Address[];
    error: any;
    shippingFeesByFarmId: FarmShippingFee[];
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
    const [shippingFeesByFarmId, setShippingFeesByFarmId] = useState<FarmShippingFee[]>([]);

    const { calculate: calculateGHTKFee, loading: isCalculating, error } = useCalculateGHTKShipping();

    // Track calculation state
    const isCalculatingRef = useRef(false);

    const performCalculation = useCallback(async () => {
        // Skip if already calculating
        if (isCalculatingRef.current) {
            console.log('⏭️ Skip: Already calculating');
            return;
        }

        isCalculatingRef.current = true;

        try {
            // Extract farm addresses
            const addresses = extractFarmAddresses(cartItems);
            setFarmAddresses(addresses);

            if (addresses.length === 0) {
                console.warn('⚠️ No farm addresses found');
                setShippingFee(3.99); // Default fallback
                setShippingFeesByFarm({});
                setShippingFeesByFarmId([]);
                return;
            }

            let totalFeeVND = 0;
            const newShippingFeesByFarm: Record<string, number> = {};
            const newShippingFeesByFarmId: FarmShippingFee[] = [];

            // Calculate fee for each farm address
            for (const farmAddress of addresses) {
                // Filter items belonging to this farm
                const farmItems = cartItems.filter(item => {
                    const addr = item.batch?.season?.farm?.address;
                    return addr &&
                        addr.province === farmAddress.province &&
                        addr.district === farmAddress.district &&
                        addr.ward === farmAddress.ward &&
                        addr.detail === farmAddress.detail;
                });

                if (farmItems.length === 0) continue;


                const farmName = farmItems[0]?.batch?.season?.farm?.farmName || "Unknown Farm";


                const farmWeight = farmItems.reduce((sum, item) => sum + (item.quantity * 500), 0);
                const farmSubtotalUSD = farmItems.reduce((sum, item) => sum + (item.itemPrice * item.quantity), 0);
                const farmValueVND = Math.round(farmSubtotalUSD * 24000);

                console.log(`📦 Calculating GHTK fee for farm ${farmName} in ${farmAddress.province}:`, {
                    to: customerAddress?.province,
                    items: farmItems.length,
                    weight: farmWeight,
                    valueVND: farmValueVND
                });

                let farmFeeVND = 0;

                try {
                    const result = await calculateGHTKFee({
                        pick_province: farmAddress.province,
                        pick_district: farmAddress.district,
                        province: customerAddress?.province || '',
                        district: customerAddress?.district || '',
                        address: customerAddress?.detail || '',
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

                newShippingFeesByFarmId.push({
                    farmId: farmAddress.farmId || '',
                    fee: farmFeeVND
                });
            }



            setShippingFeesByFarm(newShippingFeesByFarm);
            setShippingFeesByFarmId(newShippingFeesByFarmId);

        } catch (err) {
            console.error('❌ Global calculation error:', err);
            setShippingFee(3.99);
            setShippingFeesByFarm({});
            setShippingFeesByFarmId([]);
        } finally {
            isCalculatingRef.current = false;
        }
    }, [cartItems, customerAddress, calculateGHTKFee]); // ← Dependencies here

    // Create stable calculation trigger key
    const calculationKey = useMemo(() => {
        const itemsKey = cartItems.map(i => `${i.id}-${i.quantity}`).sort().join('|');
        const addressKey = customerAddress
            ? `${customerAddress.province}:${customerAddress.district}:${customerAddress.ward}`
            : '';
        return itemsKey && addressKey ? `${itemsKey}__${addressKey}` : '';
    }, [cartItems, customerAddress]);

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
            setShippingFeesByFarmId([]);
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
        shippingFeesByFarmId
    };
};
