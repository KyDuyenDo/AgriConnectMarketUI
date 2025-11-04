export interface Product {
  id: string
  name: string
  farm: string
  price: string
  unit: string
  image: string
  isFavorite?: boolean
}

export interface CartItem {
  id: string
  name: string
  quantity: string
  price: string
  image: string
}

export interface Order {
  id: string
  farm: string
  itemsCount: number
  date: string
  price: string
  status: "Delivered" | "In Transit"
  action: string
}
