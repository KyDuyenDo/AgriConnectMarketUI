import { useQuery } from "@tanstack/react-query";
import BatchService from "@/services/batches.service";
import { ProductBatch } from "@/types";

export const useBatchDetail = (batchId: string) => {
    return useQuery<ProductBatch>({
        queryKey: ["batch", batchId],
        queryFn: () => BatchService.getBatchById(batchId),
        enabled: !!batchId,
    });
};
