export interface Category {
  id: string;
  categoryName: string;
  categoryDesc: string;
  illustrativeImageUrl: string;
  isDelete?: boolean;
}

export interface ProductResponse {
  id: string;
  productName: string;
  productAttribute: string;
  productDesc: string;
  categoryId: string;
  category?: Category; // Optional for when we fetch with include
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  farm: string;
  price: string;
  unit: string;
  image: string;
  isFavorite: boolean;
  rating: number;
  numRatings: number;
  status: string;
  batch: string;
  quantity: number;
  addedFavoriteDate?: string;
  // Optional fields for compatibility or mapping
  categoryId?: string;
  category?: Category | string;
  season?: any;
  // Backend fields (optional)
  productName?: string;
  productAttribute?: string;
  productDesc?: string;
}

export interface Season {
  id: string;
  seasonName: string;
  seasonDesc: string;
  status: string;
  startDate: string;
  endDate: string;
  farmId: string;
  productId: string;
  product?: Product; // Optional
}

export interface Batch {
  id: string;
  batchCode?: string; // Might be generated or optional
  totalYield: number;
  availableQuantity: number;
  units: string;
  price: number;
  plantingDate: string;
  harvestDate?: string;
  seasonId: string;
  season?: Season; // Optional
  soldQuantity?: number;
  isActive?: boolean;
}

// Keeping existing types that might be used elsewhere for now, but marking them as potentially legacy if they conflict.
// Re-adding UserData and others that seemed useful.

export interface CartItem {
  id: string
  name: string
  quantity: string
  price: string
  image: string
}

export interface Order {
  id: string
  farm: string
  itemsCount: number
  date: string
  price: string
  status: "Delivered" | "In Transit"
  action: string
}

export type HistoryItem = {
  id: string;
  step: number;
  title: string;
  description: string;
  color: string;
};

export type UserData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  joinDate: string;
  rating: number;
  totalOrders: number;
};

export type LoginRequest = {
  Username: string;
  Password: string;
}

export type RegisterRequest = {
  Username: string;
  Password: string;
  Email: string;
  FullName: string;
  Phone: string;
  IsFarmer: boolean;
  Avatar: File;
}

export interface CartRequest {
  cartId: string,
  batchId: string,
  quantity: 1
}
