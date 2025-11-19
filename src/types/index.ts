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

export type Season = {
  seasonName: string;
  seasonDesc: string;
  startDate: string;
  endDate: string;
  farmId: string;
}
