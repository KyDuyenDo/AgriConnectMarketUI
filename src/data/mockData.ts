import type { Product, CartItem, Order } from "../types"

export const favoriteProducts: Product[] = [
  {
    id: "1",
    name: "Organic Carrots",
    farm: "Green Valley Farm",
    price: "$3.25",
    unit: "lb",
    image: "https://plus.unsplash.com/premium_photo-1664527305901-a3c8bec62850?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
    isFavorite: true,
    rating: 4.5,
    numRatings: 120,
    batch: "A1",
    quantity: 50,
  },
  {
    id: "2",
    name: "Fresh Kale",
    farm: "Sunny Acres Farm",
    price: "$2.75",
    unit: "bunch",
    image: "https://plus.unsplash.com/premium_photo-1664527305901-a3c8bec62850?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
    isFavorite: true,
    batch: "B2",
    quantity: 30,
  },
]

export const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Organic Tomatoes",
    quantity: "2 lbs",
    price: "$8.50",
    image: "https://plus.unsplash.com/premium_photo-1664527305901-a3c8bec62850?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
  },
  {
    id: "2",
    name: "Baby Spinach",
    quantity: "1 bunch",
    price: "$4.25",
    image: "https://plus.unsplash.com/premium_photo-1664527305901-a3c8bec62850?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
  },
]

export const recentOrders: Order[] = [
  {
    id: "1",
    farm: "Green Valley Farm",
    itemsCount: 5,
    date: "Nov 15, 2024",
    price: "$32.50",
    status: "Delivered",
    action: "Reorder",
  },
  {
    id: "2",
    farm: "Sunny Acres Farm",
    itemsCount: 3,
    date: "Nov 18, 2024",
    price: "$18.75",
    status: "In Transit",
    action: "Track",
  },
]
