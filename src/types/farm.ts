import { Farm } from "./index";

export interface FarmQuery {
  IsMallFarm: boolean;
  searchTerm: string
}

export interface FarmResponse {
  success: boolean;
  message: string;
  data: Farm[];
}

export interface CreateFarmResponse {
  farmId: string;
  farmName: string;
  farmDesc?: string;
  bannerUrl?: string;
  phone: string;
  area: string;
}

export interface UpdateFarmResponse {
  farmId: string;
  farmName: string;
  farmDesc?: string;
  bannerUrl?: string;
  phone: string;
  area: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
}
