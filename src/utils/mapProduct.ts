import { Product, ProductResponse } from "@/types";


const mapProductResponseToProduct = (response: ProductResponse): Product => {
    return {
        id: crypto.randomUUID(), // hoặc response.id nếu có
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
        batch: "Batch-1",
        quantity: 0,
        category: response.categoryId,
        season: undefined,
    };
};

const mapProductToResponse = (product: Partial<Product>): ProductResponse => {
  return {
    productName: product.name || "",
    productAttribute: `${product.price || "0"} ${product.unit || "kg"}`, 
    productDesc: product.description || "", 
    categoryId: product.category || "",
  };
};

export { mapProductResponseToProduct, mapProductToResponse };
