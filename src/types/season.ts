import { Product } from './product';

export interface Season {
    id: string;
    seasonName: string;
    seasonDesc?: string;
    status: 'Pending' | 'Active' | 'Completed' | string;
    startDate?: string;
    endDate?: string;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
    farmId?: string;
    productId?: string;
    product?: Product;
    area?: number;
}
