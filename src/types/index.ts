export interface Product {
  id: string
  name: string
  farm: string
  price: string
  unit: string
  image: string
  isFavorite?: boolean
  addedFavoriteDate?: string
  rating?: number
  numRatings?: number
  status?: "In Stock" | "Out of Stock"
  batch: string,
  quantity: number,
  category?: string,
  season?: string,
  description?: string,
}

export interface ProductResponse {
  productName: string,
  productAttribute: string,
  productDesc: string,
  categoryId: string,
}

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

export type AuthResponse = {
  token: string;
  user: UserData;
}

export type Season = {
  seasonName: string;
  seasonDesc: string;
  startDate: string;
  endDate: string;
  farmId: string;
}

export const profileUserData: UserData = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  phone: "+84 123 456 789",
  location: "Hồ Chí Minh, Việt Nam",
  avatar: "https://images.unsplash.com/photo-1472099645785-b586d89ba3ee?auto=format&fit=crop&w=300&q=80",
  joinDate: "January 2024",
  rating: 4.8,
  totalOrders: 127,
}