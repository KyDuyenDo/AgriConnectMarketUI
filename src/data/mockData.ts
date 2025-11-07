import { Settings, Shield, ShoppingBag, Truck, User } from "lucide-react-native"
import type { Product, CartItem, Order } from "../types"
import { Alert } from "react-native"

export const favoriteProducts: Product[] = [
  {
    id: "1",
    name: "Organic Carrots",
    farm: "Green Valley Farm",
    price: "$3.25",
    unit: "lb",
    image:
      "https://plus.unsplash.com/premium_photo-1664527305901-a3c8bec62850?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
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
    image:
      "https://plus.unsplash.com/premium_photo-1664527305901-a3c8bec62850?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
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
    image:
      "https://plus.unsplash.com/premium_photo-1664527305901-a3c8bec62850?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
  },
  {
    id: "2",
    name: "Baby Spinach",
    quantity: "1 bunch",
    price: "$4.25",
    image:
      "https://plus.unsplash.com/premium_photo-1664527305901-a3c8bec62850?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
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

export const farmerOrders = [
  {
    id: "1",
    number: "ORD-2024-1253",
    customer: "David Park",
    price: "$51.40",
    status: "delivered" as const,
    timestamp: "Yesterday",
    products: [
      "https://i1.wp.com/gardenprofessors.com/wp-content/uploads/2016/01/tomato.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.kg43SVwSbZnav-CoQIR9lQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://thegardeningdad.com/wp-content/uploads/2020/05/iceberg-lettuce.jpg",
    ],
    additionalProducts: 3,
    rating: 5,
    message: "Delivered successfully",
  },
  {
    id: "2",
    number: "ORD-2024-1254",
    customer: "Emma Thompson",
    price: "$35.20",
    status: "shipped" as const,
    timestamp: "3 hours ago",
    products: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=100",
      "https://images.unsplash.com/photo-1599599810898-a2f1c13cd8df?w=100",
      "https://images.unsplash.com/photo-1599599810764-fd04065f2d5f?w=100",
    ],
    deliveryTime: "4:30 PM today",
  },
  {
    id: "3",
    number: "ORD-2024-1256",
    customer: "Sarah Chen",
    price: "$42.50",
    status: "urgent" as const,
    timestamp: "2 min ago",
    products: [
      "https://i1.wp.com/gardenprofessors.com/wp-content/uploads/2016/01/tomato.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.kg43SVwSbZnav-CoQIR9lQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://thegardeningdad.com/wp-content/uploads/2020/05/iceberg-lettuce.jpg",
    ],
    additionalProducts: 2,
    address: "123 Green Valley St, Downtown",
  },
  {
    id: "4",
    number: "ORD-2024-1255",
    customer: "Michael Rodriguez",
    price: "$28.75",
    status: "processing" as const,
    timestamp: "1 hour ago",
    products: [
      "https://i1.wp.com/gardenprofessors.com/wp-content/uploads/2016/01/tomato.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.kg43SVwSbZnav-CoQIR9lQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    ],
    address: "456 Oak Avenue, Riverside",
    timeline: [
      { text: "Order Confirmed", time: "2 hours ago", color: "bg-[#4CAF50]" },
      { text: "Processing", time: "1 hour ago", color: "bg-[#4CAF50]" },
      { text: "Ready for Pickup", time: "", color: "bg-gray-300" },
    ],
  },
]

export const profileUserData = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  phone: "+84 123 456 789",
  location: "Hồ Chí Minh, Việt Nam",
  avatar: "https://images.unsplash.com/photo-1472099645785-b586d89ba3ee?auto=format&fit=crop&w=300&q=80",
  joinDate: "January 2024",
  rating: 4.8,
  totalOrders: 127,
}

export const exploreFarms = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80",
    name: "Sunrise Valley Farm",
    location: "Sonoma County, CA",
    distance: "2.3 mi",
    rating: 4.8,
    reviews: 124,
    tags: ["Organic Certified", "Sustainable", "Water Wise"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1590080875831-f32e7b5a1d59?auto=format&fit=crop&w=300&q=80",
    name: "Greenleaf Organics",
    location: "Napa Valley, CA",
    distance: "4.1 mi",
    rating: 4.6,
    reviews: 89,
    tags: ["Organic", "Family Owned", "Non-GMO"],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=300&q=80",
    name: "Harvest Hill Farm",
    location: "Petaluma, CA",
    distance: "3.7 mi",
    rating: 4.9,
    reviews: 212,
    tags: ["Sustainable", "Local Favorite", "Fresh Produce"],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1556228578-2fba5d29b9e0?auto=format&fit=crop&w=300&q=80",
    name: "Golden Fields Ranch",
    location: "Healdsburg, CA",
    distance: "5.5 mi",
    rating: 4.7,
    reviews: 76,
    tags: ["Grass-Fed", "Free Range", "Eco Friendly"],
  },
]

export const batchDetailProduct = {
  id: "TOM001",
  verified: true,
  name: "Organic Roma Tomatoes",
  variety: "Heirloom Variety",
  farmName: "Sunrise Valley Farm",
  farmLogo: "https://tse2.mm.bing.net/th/id/OIP.i4SZaMUIFbRTt7VYawSBqgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  harvestDate: "Today, 6:00 AM",
  totalYield: "45 lbs available",
}

export const batchDetailFarmItems = [
  {
    id: "1",
    name: "Bell Peppers",
    price: "$3.25/lb",
    image: "https://tse3.mm.bing.net/th/id/OIP.3BUWlcnh6caZgQMY_RWfnQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "2",
    name: "Zucchini",
    price: "$2.75/lb",
    image: "https://tse3.mm.bing.net/th/id/OIP.3BUWlcnh6caZgQMY_RWfnQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "3",
    name: "Cucumbers",
    price: "$1.50/lb",
    image: "https://tse3.mm.bing.net/th/id/OIP.3BUWlcnh6caZgQMY_RWfnQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
]

export const profileMenuItems = [
  {
    title: "Personal Information",
    icon: User,
    color: "#3B82F6",
    action: () => Alert.alert("Personal Info", "Edit personal information")
  },
  {
    title: "My Orders",
    icon: ShoppingBag,
    color: "#10B981",
    action: () => Alert.alert("Orders", "View order history")
  },
  {
    title: "Shipping Address",
    icon: Truck,
    color: "#F59E0B",
    action: () => Alert.alert("Shipping", "Manage shipping addresses")
  },
  {
    title: "Settings",
    icon: Settings,
    color: "#6B7280",
    action: () => Alert.alert("Settings", "App settings")
  },
  {
    title: "Help & Support",
    icon: Shield,
    color: "#EF4444",
    action: () => Alert.alert("Support", "Contact support team")
  }
]

export const customerCartItems = [
  {
    id: "1",
    name: "Organic Tomatoes",
    farm: "Green Valley Farm",
    status: "Fresh",
    harvested: "2 days ago",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
    unit: "lbs",
    price: "$4.25/lb",
    total: "$8.50",
    quantity: 2,
  },
  {
    id: "2",
    name: "Baby Spinach",
    farm: "Sunny Acres Farm",
    status: "Fresh",
    harvested: "today",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spinach_leaves.jpg",
    unit: "bunch",
    price: "$4.25/bunch",
    total: "$4.25",
    quantity: 1,
  },
  {
    id: "3",
    name: "Organic Carrots",
    farm: "Sunny Acres Farm",
    status: "Limited Stock",
    harvested: "1 day ago",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Carrots_of_many_colors.jpg",
    unit: "lbs",
    price: "$3.25/lb",
    total: "$9.75",
    quantity: 3,
  },
  {
    id: "4",
    name: "Fresh Kale",
    farm: "Green Valley Farm",
    status: "Fresh",
    harvested: "today",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Kale-Bundle.jpg",
    unit: "bunch",
    price: "$2.75/bunch",
    total: "$2.75",
    quantity: 1,
  },
]

export const mockProducts: Product[] = [
  {
    id: "P001",
    name: "Organic Tomatoes",
    farm: "Green Valley Farm",
    price: "2.50",
    unit: "kg",
    image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
    isFavorite: true,
    addedFavoriteDate: "2025-11-01",
    rating: 4.7,
    numRatings: 128,
    status: "In Stock",
    batch: "BCH-2025-001",
    quantity: 240,
  },
  {
    id: "P002",
    name: "Fresh Lettuce",
    farm: "Sunny Fields",
    isFavorite: true,
    price: "1.20",
    unit: "piece",
    image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
    rating: 4.3,
    numRatings: 89,
    status: "In Stock",
    batch: "BCH-2025-002",
    quantity: 150,
  },
  {
    id: "P003",
    name: "Free-range Eggs",
    farm: "Happy Hen Farm",
    price: "3.50",
    unit: "dozen",
    image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
    isFavorite: true,
    rating: 4.9,
    numRatings: 300,
    status: "Out of Stock",
    batch: "BCH-2025-003",
    quantity: 0,
  },
  {
    id: "P004",
    name: "Sweet Corn",
    farm: "Golden Harvest",
    isFavorite: true,
    price: "1.80",
    unit: "kg",
    image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
    rating: 4.5,
    numRatings: 210,
    status: "In Stock",
    batch: "BCH-2025-004",
    quantity: 320,
  },
  {
    id: "P005",
    name: "Strawberries",
    farm: "Berry Bliss",
    price: "4.00",
    unit: "box",
    image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
    isFavorite: true,
    addedFavoriteDate: "2025-10-25",
    rating: 4.8,
    numRatings: 185,
    status: "In Stock",
    batch: "BCH-2025-005",
    quantity: 95,
  },
]
