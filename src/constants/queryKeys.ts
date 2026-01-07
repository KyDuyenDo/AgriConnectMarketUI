/**
 * Centralized React Query keys configuration
 * Ensures consistency across all hooks and mutations
 */

export const CART_QUERY_KEYS = {
  all: ["cart"] as const,
  me: ["cart", "me"] as const,
  item: (batchId: string) => ["cart", "item", batchId] as const,
}

export const ORDERS_QUERY_KEYS = {
  all: ["orders"] as const,
  myOrders: ["my-orders"] as const,
  farmOrders: (farmId: string) => ["farmer-orders", farmId] as const,
  orderDetail: (orderId: string) => ["order", orderId] as const,
  preOrders: ["pre-orders"] as const,
  myPreOrders: ["my-pre-orders"] as const,
  farmPreOrders: (farmId: string) => ["farmer-pre-orders", farmId] as const,
}

export const CARE_EVENT_KEYS = {
  all: ["care-events"] as const,
  eventTypes: ["event-types"] as const,
  byBatch: (batchId: string) => ["care-events", "batch", batchId] as const,
}

export const FAVORITES_QUERY_KEYS = {
  all: ["favorite-farms"] as const,
}

export const PRODUCTS_QUERY_KEYS = {
  all: ["products"] as const,
  list: (query?: string) => ["products", { query }] as const,
  detail: (productId: string) => ["product", productId] as const,
  batches: (productId: string) => ["product", productId, "batches"] as const,
}

export const FARM_QUERY_KEYS = {
  all: ["farms"] as const,
  list: (query?: string) => ["farms", { query }] as const,
  detail: (farmId: string) => ["farm", farmId] as const,
  myFarm: ["farm", "me"] as const,
  batches: (farmId: string) => ["farm", farmId, "batches"] as const,
  reviews: (farmId: string) => ["farm", farmId, "reviews"] as const,
}

export const BATCH_QUERY_KEYS = {
  all: ["batches"] as const,
  list: () => ["batches", "list"] as const,
  detail: (batchId: string) => ["batch", batchId] as const,
  seasons: (batchId: string) => ["batch", batchId, "seasons"] as const,
}

export const SEASON_QUERY_KEYS = {
  all: ["seasons"] as const,
  detail: (seasonId: string) => ["season", seasonId] as const,
}

export const ADDRESS_QUERY_KEYS = {
  all: ["addresses"] as const,
  myAddresses: ["addresses", "me"] as const,
  detail: (addressId: string) => ["address", addressId] as const,
}

export const PROFILE_QUERY_KEYS = {
  me: ["profile", "me"] as const,
  detail: (userId: string) => ["profile", userId] as const,
}

export const REVIEW_QUERY_KEYS = {
  all: ["reviews"] as const,
  byProduct: (productId: string) => ["reviews", "product", productId] as const,
  byFarm: (farmId: string) => ["reviews", "farm", farmId] as const,
  detail: (reviewId: string) => ["review", reviewId] as const,
}
