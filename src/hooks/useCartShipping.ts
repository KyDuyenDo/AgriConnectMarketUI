import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useCalculateGHTKShipping } from './GHTK/useCalculateGHTKShipping';
import { extractFarmAddresses, CartItem, Address, CartFarmGroup } from '@/services/cart.service';

interface UseCartShippingParams {
    cartItems: CartFarmGroup[];
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

    // Memoize selected items groups
    const selectedGroups = useMemo(() => {
        return cartItems.map(group => ({
            ...group,
            items: group.items.filter(item => selectedItemIds.includes(item.itemId))
        })).filter(group => group.items.length > 0);
    }, [cartItems, selectedItemIds]);

    // Memoize calculation function with useCallback
    const performCalculation = useCallback(async () => {
        // Skip if already calculating
        if (isCalculatingRef.current) {
            console.log('⏭️ Skip: Already calculating');
            return;
        }

        // Reset if no data
        if (!customerAddress || selectedGroups.length === 0) {
            setShippingFee(0);
            setFarmAddresses([]);
            setShippingFeesByFarm({});
            return;
        }

        isCalculatingRef.current = true;

        try {
            // Extract farm addresses
            const addresses = extractFarmAddresses(selectedGroups);
            setFarmAddresses(addresses);

            if (addresses.length === 0) {
                console.warn('⚠️ No farm addresses found');
                setShippingFee(30000); // Default fallback 30k VND
                setShippingFeesByFarm({});
                return;
            }

            let totalFeeVND = 0;
            const newShippingFeesByFarm: Record<string, number> = {};

            // Calculate fee for each farm address
            for (const farmAddress of addresses) {
                // Filter items belonging to this farm address across all groups
                const farmItems: CartItem[] = [];

                for (const group of selectedGroups) {
                    const addr = group.farmAddress;
                    if (addr &&
                        addr.province === farmAddress.province &&
                        addr.district === farmAddress.district &&
                        addr.ward === farmAddress.ward &&
                        addr.detail === farmAddress.detail) {
                        farmItems.push(...group.items);
                    }
                }

                if (farmItems.length === 0) continue;

                const matchedGroup = selectedGroups.find(g => {
                    const addr = g.farmAddress;
                    return addr &&
                        addr.province === farmAddress.province &&
                        addr.district === farmAddress.district &&
                        addr.ward === farmAddress.ward &&
                        addr.detail === farmAddress.detail;
                });

                const farmName = matchedGroup?.farmName || "Unknown Farm";

                // Calculate metrics for this farm's shipment
                const farmWeight = farmItems.reduce((sum, item) => sum + (item.quantity * 500), 0);
                const farmSubtotalVND = farmItems.reduce((sum, item) => sum + (item.itemPrice * item.quantity), 0);
                const farmValueVND = farmSubtotalVND;

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

                newShippingFeesByFarm[farmName] = farmFeeVND;
            }

            if (totalFeeVND > 0) {
                console.log(`💰 Total Shipping Fee: ${totalFeeVND} VND`);
                setShippingFee(totalFeeVND);
            } else {
                setShippingFee(30000);
            }

            setShippingFeesByFarm(newShippingFeesByFarm);

        } catch (err) {
            console.error('❌ Global calculation error:', err);
            setShippingFee(30000);
            setShippingFeesByFarm({});
        } finally {
            isCalculatingRef.current = false;
        }
    }, [selectedGroups, customerAddress, calculateGHTKFee]); // ← Dependencies here

    // Create stable calculation trigger key
    const calculationKey = useMemo(() => {
        // Flatten items for key generation
        const allItems = selectedGroups.flatMap(g => g.items);
        const itemsKey = allItems.map(i => `${i.itemId}-${i.quantity}`).sort().join('|');
        const addressKey = customerAddress
            ? `${customerAddress.province}:${customerAddress.district}:${customerAddress.ward}`
            : '';
        return itemsKey && addressKey ? `${itemsKey}__${addressKey}` : '';
    }, [selectedGroups, customerAddress]);

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
