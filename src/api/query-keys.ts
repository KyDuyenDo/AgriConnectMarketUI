/**
 * Centralized React Query keys configuration
 * Ensures consistency across all hooks and mutations
 */

export const queryKeys = {
  cart: {
    all: ["cart"] as const,
    me: ["cart", "me"] as const,
    item: (batchId: string) => ["cart", "item", batchId] as const,
  },

  orders: {
    all: ["orders"] as const,
    myOrders: ["my-orders"] as const,
    farmOrders: (farmId: string) => ["farmer-orders", farmId] as const,
    detail: (orderId: string) => ["order", orderId] as const,
    preOrders: ["pre-orders"] as const,
    myPreOrders: ["my-pre-orders"] as const,
    farmPreOrders: (farmId: string) => ["farmer-pre-orders", farmId] as const,
  },

  products: {
    all: ["products"] as const,
    list: (query?: string) => ["products", { query }] as const,
    detail: (productId: string) => ["product", productId] as const,
    batches: (productId: string) => ["product", productId, "batches"] as const,
  },

  farms: {
    all: ["farms"] as const,
    list: (query?: string) => ["farms", { query }] as const,
    detail: (farmId: string) => ["farm", farmId] as const,
    myFarm: ["farm", "me"] as const,
    batches: (farmId: string) => ["farm", farmId, "batches"] as const,
    reviews: (farmId: string) => ["farm", farmId, "reviews"] as const,
  },

  batches: {
    all: ["batches"] as const,
    list: () => ["batches", "list"] as const,
    detail: (batchId: string) => ["batch", batchId] as const,
    seasons: (batchId: string) => ["batch", batchId, "seasons"] as const,
  },

  seasons: {
    all: ["seasons"] as const,
    detail: (seasonId: string) => ["season", seasonId] as const,
  },

  careEvents: {
    all: ["care-events"] as const,
    byBatch: (batchId: string) => ["care-events", "batch", batchId] as const,
    types: ["care-events", "types"] as const,
  },

  addresses: {
    all: ["addresses"] as const,
    myAddresses: ["addresses", "me"] as const,
    detail: (addressId: string) => ["address", addressId] as const,
  },

  profile: {
    me: ["profile", "me"] as const,
    detail: (userId: string) => ["profile", userId] as const,
  },

  reviews: {
    all: ["reviews"] as const,
    byProduct: (productId: string) => ["reviews", "product", productId] as const,
    byFarm: (farmId: string) => ["reviews", "farm", farmId] as const,
    detail: (reviewId: string) => ["review", reviewId] as const,
  },

  favorites: {
    all: ["favorites"] as const,
    myFavorites: ["favorites", "me"] as const,
    farms: ["favorites", "farms"] as const,
  },
}
