import type { Product, CartItem, Order } from "../types"

export const favoriteProducts: Product[] = [
  {
    id: "1",
    name: "Organic Carrots",
    farm: "Green Valley Farm",
    price: "$3.25",
    unit: "/lb",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ozNUZNzwR8389Fh431tU3S7wsXqwlB.png",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Fresh Kale",
    farm: "Sunny Acres Farm",
    price: "$2.75",
    unit: "/bunch",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ozNUZNzwR8389Fh431tU3S7wsXqwlB.png",
    isFavorite: true,
  },
]

export const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Organic Tomatoes",
    quantity: "2 lbs",
    price: "$8.50",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UHL60E5FZV9CN3JXmhZvJEBuJZ82wa.png",
  },
  {
    id: "2",
    name: "Baby Spinach",
    quantity: "1 bunch",
    price: "$4.25",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UHL60E5FZV9CN3JXmhZvJEBuJZ82wa.png",
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
