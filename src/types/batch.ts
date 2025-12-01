// -------------------
// CATEGORY
// -------------------
export interface Category {
    id: string
    categoryName: string
    categoryDesc: string
    illustrativeImageUrl: string
    isDelete: boolean
    products: any[] // backend trả về [null]
}

// -------------------
// PRODUCT
// -------------------
export interface Product {
    id: string
    productName: string
    productAttribute: string
    productDesc: string
    categoryId: string
    createdAt: string

    category: Category
    seasons: any[] // backend trả về [null]
}

// -------------------
// PRODUCT BATCH (nested inside season)
// -------------------
export interface SeasonProductBatch {
    id: string
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
}

// -------------------
// SEASON
// -------------------
export interface Season {
    id: string
    seasonName: string
    seasonDesc: string
    status: string

    startDate: string
    endDate: string
    createdAt: string

    farmId: string
    productId: string

    product?: Product

    // Danh sách batch thuộc season
    productBatches?: SeasonProductBatch[]
}

// -------------------
// FARMER PROFILE
// -------------------
export interface FarmerProfile {
    id: string
    fullname: string
    email: string
    phone: string
    avatarUrl: string
    accountId: string
    createdAt: string
}

// -------------------
// FARMER ACCOUNT
// -------------------
export interface FarmerAccount {
    id: string
    userName: string
    password: string
    role: "Farmer"
    isActive: boolean
    isDeLeted: boolean
    createdAt: string
    profile: FarmerProfile
}

// -------------------
// ADDRESS
// -------------------
export interface Address {
    id: string
    province: string
    district: string
    ward: string
    detail: string
    isDefault: boolean
    isDelete: boolean
    createdAt: string
}

// -------------------
// MAIN FARM DETAIL RESPONSE (metadata)
// -------------------
export interface FarmDetailResponse {
    success: boolean
    message: string
    data: {
        id: string

        farmName: string
        farmDesc: string
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
        farmer: FarmerAccount

        addressId: string
        address: Address

        seasons: Season[]
    }
}

// -------------------
// YOUR ORIGINAL BATCH (cleaned version)
// -------------------
export interface Batch {
    id: string

    // hybrid: string | object
    batchCode: { value: string }

    totalYield: number
    availableQuantity: number
    units: string
    price: number

    plantingDate: string
    harvestDate?: string

    imageUrls: string[]

    seasonId: string
    season?: Season

    createdAt?: string

    // metadata
    averageRating: number
    reviewCount: number

    // UI helpers
    status?: string
    isActive?: boolean
}
