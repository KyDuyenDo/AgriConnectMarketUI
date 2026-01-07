import apiClient from "@/api/config"
import { extractResponseData } from "@/api/response-handler"

export interface Customer {
  id: string
  fullname: string
  phone: string
  email: string
}

export interface ResponseCart {
  success: boolean
  message: string
  data: {
    cartId: string
    totalPrice: number
    fullname: string
    email: string
    phone: string
    cartItems: CartFarmGroup[]
  }
}

export interface CartValue {
  customerId: string
  totalPrice: number
  customer: Customer
  cartItems: CartFarmGroup[]
  cartId: string
}

export interface CartFarmGroup {
  farmId: string
  farmName: string
  farmAddress: Address
  items: CartItem[]
}

export interface CartItem {
  itemId: string
  batchId: string
  quantity: number
  unitPrice: number
  batchPrice: number
  subTotal: number
  itemPrice: number
  batchCode: string
  seasonId: string
  seasonStatus: string
  productName: string
  units: string
  farmId: string
  batchImageUrls: string[]
  isOutOfStock: boolean
  createdAt: string
}

export interface Batch {
  batchCode: {
    value: string
  }
  totalYield: number
  availableQuantity: number
  units: string
  price: number
  plantingDate: string
  harvestDate: string
  imagesUrl: string[]
  seasonId: string
  season: Season
  productId: string
  product: Product
  productBatches: (ProductBatch | null)[]
  createdAt: string
  id: string
}

export interface Season {
  seasonName: string
  seasonDesc: string
  status: string
  startDate: string
  endDate: string
  createdAt: string
  farmId: string
  farm: Farm
  productId?: string
  productBatches?: ProductBatch[]
  id: string
}

export interface Farm {
  farmName: string
  batchCodePrefix: string
  bannerUrl: string
  phone: string
  area: string
  isDelete: boolean
  isBanned: boolean
  isValidForSelling: boolean
  isConfirmAsMall: boolean
  createdAt: string
  farmerId: string
  addressId: string
  address: Address
  seasons: (Season | null)[]
  history: FarmHistory[]
  id: string
}

export interface Address {
  province: string
  district: string
  ward: string
  detail: string
  isDefault?: boolean
  createdAt?: string
  id?: string
}

export interface FarmHistory {
  year: string
  title: string
  description: string
  color: string
}

export interface Product {
  productName: string
  productAttribute: string
  productDesc: string
  categoryId: string
  category: Category
  seasons: (Season | null)[]
  createdAt: string
  id: string
}

export interface Category {
  categoryName: string
  categoryDesc: string
  illustrativeImageUrl: string
  isDelete: boolean
  products: (Product | null)[]
  id: string
}

export interface ProductBatch {
  batchCode: {
    value: string
  }
  totalYield: number
  availableQuantity: number
  units: string
  price: number
  plantingDate: string
  harvestDate: string
  imagesUrl: string[]
  seasonId: string
  createdAt: string
  id: string
}

export interface AddToCartRequest {
  batchId: string
  quantity: number
}

export interface UpdateCartItemRequest {
  batchId: string
  quantity: number
}

export const cartService = {
  getCart: async () => {
    const response = await apiClient.get<any>("/api/carts/me")
    const cartData = extractResponseData<ResponseCart["data"]>(response.data) || {
      cartId: "",
      totalPrice: 0,
      fullname: "",
      email: "",
      phone: "",
      cartItems: [],
    }

    if (cartData.cartItems && Array.isArray(cartData.cartItems)) {
      cartData.cartItems = cartData.cartItems.map((group: any) => ({
        ...group,
        items: (group.items || []).map((item: any, index: number) => ({
          itemId: item.itemId || `${item.batchId}-${index}`,
          batchId: item.batchId || "",
          quantity: item.quantity || 0,
          unitPrice: item.unitPrice || item.batchPrice || 0,
          batchPrice: item.batchPrice || item.unitPrice || 0,
          subTotal: item.subTotal || item.itemPrice || (item.quantity || 0) * (item.batchPrice || 0),
          itemPrice: item.itemPrice || item.subTotal || (item.quantity || 0) * (item.batchPrice || 0),
          batchCode: item.batchCode || "",
          seasonId: item.seasonId || "",
          seasonStatus: item.seasonStatus || "Active",
          productName: item.productName || "Unknown Product",
          units: item.units || "unit",
          farmId: item.farmId || group.farmId || "",
          batchImageUrls: Array.isArray(item.batchImageUrls)
            ? item.batchImageUrls
                .map((img: any) => {
                  if (typeof img === "string") return img
                  if (img && typeof img === "object") return img.imageUrl || img.uri || ""
                  return ""
                })
                .filter((url: string) => url)
            : [],
          isOutOfStock: item.isOutOfStock === true,
          createdAt: item.createdAt || new Date().toISOString(),
        })),
      }))
    }

    return cartData
  },

  addToCart: async (batchId: string, quantity: number) => {
    const response = await apiClient.post<any>("/api/carts/items", {
      batchId,
      quantity,
    })
    return extractResponseData<ResponseCart["data"]>(response.data)
  },

  updateCartItem: async (batchId: string, quantity: number) => {
    const response = await apiClient.put<any>(`/api/carts/items/${batchId}`, {
      quantity,
    })
    return extractResponseData<ResponseCart["data"]>(response.data)
  },

  removeFromCart: async (batchId: string) => {
    const response = await apiClient.delete<any>(`/api/carts/items/${batchId}`)
    return extractResponseData<ResponseCart["data"]>(response.data)
  },

  clearCart: async () => {
    const response = await apiClient.delete<any>("/api/carts")
    return extractResponseData<ResponseCart["data"]>(response.data)
  },
}
