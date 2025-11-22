export interface ProductBatch {
    id: string;
    seasonId?: string;
    productId?: string;
    farmId?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    quantity?: number;
    price?: number;
    createdAt?: string;
    seasonName?: string;
    seasonDesc?: string;
}
