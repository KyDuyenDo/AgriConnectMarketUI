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