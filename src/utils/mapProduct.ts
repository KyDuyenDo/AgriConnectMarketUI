import { Product, ProductResponse } from "@/types";
import { v4 as uuidv4 } from "uuid";

const mapProductResponseToProduct = (response: ProductResponse, batch: string): Product => {
  return {
    id: uuidv4(), // hoặc response.id nếu có
    name: response.productName,
    farm: response.productDesc || "Unknown Farm", // nếu muốn gán default
    price: "0", // default, hoặc parse từ productAttribute nếu có giá
    unit: "kg", // default unit
    image: "", // default empty, có thể lấy từ attribute nếu có
    isFavorite: false,
    addedFavoriteDate: undefined,
    rating: 0,
    numRatings: 0,
    status: "In Stock",
    batch: batch,
    quantity: 0,
    category: response.categoryId,
    season: undefined,
  };
};

const mapBatchToProductCart = (id: string, batch: string, quantity: number ,price: string ): Product => {
  return {
    id: id,
    name: batch,
    farm: "Unknown Farm", // nếu muốn gán default
    price: price, // default, hoặc parse từ productAttribute nếu có giá
    unit: "kg", // default unit
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg", // default empty, có thể lấy từ attribute nếu có
    isFavorite: false,
    addedFavoriteDate: undefined,
    rating: 0,
    numRatings: 0,
    status: "In Stock",
    batch: batch,
    quantity: quantity,
    category: "",
    season: undefined,
  };
};



export { mapProductResponseToProduct, mapBatchToProductCart };
