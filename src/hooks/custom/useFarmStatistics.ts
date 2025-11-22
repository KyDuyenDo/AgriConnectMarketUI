import { useMemo } from "react";
import { useAllBatches } from "@/hooks/useBatches";
import { useSeasons } from "@/hooks/useSeasons";
import { FarmStatistics } from "@/types";

export const useFarmStatistics = (): {
    statistics: FarmStatistics | null;
    isLoading: boolean;
    error: any;
} => {
    const { data: batches, isLoading: batchesLoading, error: batchesError } = useAllBatches();
    const { data: seasons, isLoading: seasonsLoading, error: seasonsError } = useSeasons();

    const statistics = useMemo<FarmStatistics | null>(() => {
        if (!batches || !seasons) {
            return null;
        }

        const totalBatches = batches.length;
        const totalSeasons = seasons.length;

        // Calculate total available quantity from all batches
        const totalAvailableQuantity = batches.reduce(
            (sum, batch) => sum + (batch.availableQuantity || 0),
            0
        );

        // Count active batches (batches with available quantity > 0)
        const activeBatches = batches.filter(
            (batch) => batch.isActive !== false && (batch.availableQuantity || 0) > 0
        ).length;

        return {
            totalBatches,
            totalSeasons,
            totalAvailableQuantity,
            activeBatches,
        };
    }, [batches, seasons]);

    return {
        statistics,
        isLoading: batchesLoading || seasonsLoading,
        error: batchesError || seasonsError,
    };
};
