export interface Category {
    id: string;
    categoryName: string;
    categoryDesc?: string;
    illustrativeImageUrl?: string;
    isDelete?: boolean;
}

export interface Product {
    id: string;
    productName: string;
    productAttribute?: string;
    productDesc?: string;
    categoryId?: string;
    category?: Category;
    createdAt?: string;
}
