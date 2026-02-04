export interface Category {
  id: string
  categoryName: string
  categoryDesc: string
  illustrativeImageUrl: string
  isDelete?: boolean
}

export interface ProductResponse {
  id: string
  productName: string
  name?: string // Mapped from productName if needed
  productAttribute: string
  productDesc: string
  categoryId: string
  category?: Category // Optional for when we fetch with include
  createdAt?: string
}

export interface Product {
  id: string
  name: string
  farm: string
  price: string
  unit: string
  image: string | null
  isFavorite: boolean
  rating: number
  numRatings: number
  status: string
  batch: string
  quantity: number
  addedFavoriteDate?: string
  // Optional fields for compatibility or mapping
  categoryId?: string
  category?: Category
  season?: any
  // Backend fields (optional)
  productName?: string
  productAttribute?: string
  productDesc?: string
}

export interface Season {
  id: string
  seasonName: string
  seasonDesc: string
  status: string
  startDate: string
  endDate: string
  farmId: string
  productId: string
  product?: ProductResponse & { category?: Category } // Ensure category is Category type
  farm?: Farm
}

export interface Batch {
  id: string

  // batchCode can be an object or a plain string (hybrid data source)
  batchCode: { value: string }

  totalYield: number
  availableQuantity: number
  units: string
  price: number

  plantingDate: string
  harvestDate?: string

  imageUrls: string[]

  seasonId: string
  season?: {
    seasonName: string
    seasonDesc: string
    status: string
    startDate: string
    endDate: string
    createdAt: string
    farmId: string
    productId: string
    farm?: Farm

    product: {
      productName: string
      productAttribute: string
      productDesc: string
      categoryId: string

      category: {
        categoryName: string
        categoryDesc: string
        illustrativeImageUrl: string
        isDelete: boolean
        id: string
        products: any[] // backend returns [null], so type is loose
      }

      seasons: any[] // backend returns [null]
      createdAt: string
      id: string
    }

    productBatches: {
      batchCode: { value: string }
      totalYield: number
      availableQuantity: number
      units: string
      price: number
      plantingDate: string
      harvestDate: string
      imagesUrl: string[]
      seasonId: string
      createdAt: string
      updatedAt: string
      id: string
    }[]

    id: string
  }

  createdAt?: string

  // new fields from metadata
  averageRating: number
  reviewCount: number

  // optional UI helpers
  status?: string
  isActive?: boolean
}

export interface SellingBatch {
  id: string
  batchCode: string
  product: string
  season: string
  farm: string
  createdAt: string
  plantingDate: string
  harvestDate: string
  totalYield: number
  availableQuantity: number
  price: number
  units: string
  imageUrls: string[]
}

export type ProductBatch = Batch | SellingBatch

// Keeping existing types that might be used elsewhere for now, but marking them as potentially legacy if they conflict.
// Re-adding UserData and others that seemed useful.

export interface CartItem {
  id: string
  name: string
  quantity: string
  price: string
  image: string | null
}

export interface OrderItem {
  id: string
  orderId: string
  batchId: string
  quantity: number
  unitPrice: number
  subTotal: number
  batch?: Batch
}

// UI-friendly type for displaying order items
export interface OrderItemDisplay {
  id: string
  name: string
  price: string
  qtyLabel: string
  tag?: string
  imageUrl?: string | null
  productAttribute?: string
  productDesc?: string
  batchCode?: string
  batchId?: string
  farmId: string
  subTotal?: number
}

export interface Order {
  id: string
  orderId: string
  customerId: string
  orderCode: string

  orderDate: string
  orderType: string
  orderStatus: string
  paymentStatus: string

  shippingFee: number
  totalPrice: number

  paidDate?: string
  deliveredDate?: string
  expectedReleaseDate?: string
  partiallyPaidAmount?: number

  // NEW FIELDS FROM TABLE
  createdAt: string
  createdBy: string
  updatedAt?: string
  updatedBy?: string

  // Existing relations
  customer?: any // Profile type
  orderItems?: OrderItem[]
}

export type HistoryItem = {
  id: string
  step: number
  title: string
  description: string
  color: string
}

export interface FarmHistoryItem {
  year: string
  title: string
  description: string
  color: string
}

export type UserData = {
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  joinDate: string
  rating: number
  totalOrders: number
}

export type LoginRequest = {
  Username: string
  Password: string
}

export type RegisterRequest = {
  Username: string
  Password: string
  Email: string
  FullName: string
  Phone: string
  IsFarmer: boolean
  Avatar: File
}

export interface CartRequest {
  cartId: string
  batchId: string
  quantity: 1
}
export interface Address {
  id: string
  province: string
  district: string
  ward: string
  detail?: string
}

export interface Farm {
  id: string
  farmName: string
  farmDesc?: string
  batchCodePrefix?: string
  bannerUrl?: string
  certificateUrl?: string
  phone?: string
  area?: string
  isDelete?: boolean
  isBanned?: boolean
  isValidForSelling?: boolean
  isConfirmAsMall?: boolean
  createdAt?: string
  createdBy?: string
  updatedAt?: string
  updatedBy?: string
  farmerId: string
  addressId?: string
  address?: Address
  farmer?: {
    profile?: {
      fullname: string
      avatarUrl?: string
      phone?: string
      email?: string
    }
  }
  history?: FarmHistoryItem[]
}

export interface CreateFarmRequest {
  FarmName: string
  FarmDesc?: string
  Phone?: string
  Area?: string
  FarmerId: string
  Province?: string
  District?: string
  Ward?: string
  Detail?: string
  FarmBanner: File | Blob
}

export interface FarmStatistics {
  totalBatches: number
  totalSeasons: number
  totalAvailableQuantity: number
  activeBatches: number
}

export interface CreateBatchRequest {
  SeasonId: string
  TotalYield: number
  AvailableQuantity: number
  Units: string
  PlantingDate: string
  IsActive: boolean
  Price: number
  Images: any // File or Blob or whatever the picker returns, handled as FormData
}

export interface UnifiedProduct {
  id: string // Batch ID
  batchCode: string
  productName: string
  farmName: string
  farmId: string
  price: number
  unit: string
  totalYield: number
  availableQuantity: number
  categoryName: string
  categoryId: string
  imageUrl: string
  rating: number // Mocked or derived
  reviewCount?: number
  location: string // Province
}

export interface CareEventType {
  id: string
  eventTypeName: string
  eventTypeDesc: string
  careEvents?: CareEvent[]
}

export interface CareEvent {
  id: string
  batchId: string
  eventType: string // Changed from eventTypeId, now returns event type name as string
  occurredAt: DateTime
  payload: string
  imageUrl?: string // NEW field for uploaded images
  hash: string
  prevHash: string
  // Keep for backward compatibility during migration
  eventTypeId?: string
  batch?: ProductBatch
}

export type DateTime = string // ISO 8601 format

export interface CreateProductResponse {
  productId: string
  productName: string
  productAttribute: string
  productDesc?: string
  category: Category
}

export interface UpdateProductResponse {
  productId: string
  productName: string
  productAttribute: string
  productDesc?: string
  category: Category
}

export interface CreateProductBatchResponse {
  batchId: string
  batchCode: { value: string }
  totalYield: number
  availableQuantity: number
  units: string
  price: number
  plantingDate: string
  harvestDate: string
  imagesUrl: string[]
  seasonId: string
  season: Season
}

export interface CreateCareEventResponse {
  occurredAt: string
  payload: string
  eventType: CareEventType // Full object in create response
  batch: ProductBatch
}
