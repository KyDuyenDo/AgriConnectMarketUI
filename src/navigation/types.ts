export type FarmStackParamList = {
  MainTabs: undefined
  Dashboard: undefined
  AddSeason: { farmId: string }
  SeasonDetail: { seasonId: string }
  AddLot: { seasonId?: string; seasonName?: string }
  LotDetail: { lotId: string }
  AddCropLog: { batchId?: string }
  FarmDetail: { farmId: string }
  AddProduct: undefined
  AddCategory: undefined
  EditProduct: { productId: string }
  FarmerOrders: { farmerId: string }
  FarmerOrderDetail: { orderId: string }
  FarmSetupInformation: { farmId: string }
  ProductDetailReviews: { batchId: string; farmId: string }
  PersonalInformation: undefined
  FarmStatistics: undefined
  FarmCertificates: { farmId: string }
  FarmSeasons: { farmId: string }
  FarmProductsManagement: undefined
}
