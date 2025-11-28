import { View } from "react-native"
import { EmptyState } from "@/components/loading/EmptyState"

// Cart Empty State
export const EmptyCartScreen = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <View className="flex-1 bg-[#F9FAF9]">
      <EmptyState
        type="cart"
        title="Your Cart is Empty"
        description="Start adding fresh products from farmers to your cart"
        actionText="Browse Products"
        onAction={onExplore}
      />
    </View>
  )
}

// Orders Empty State
export const EmptyOrdersScreen = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <View className="flex-1 bg-[#F9FAF9]">
      <EmptyState
        type="orders"
        title="No Orders Yet"
        description="Start your first order by browsing products from our farmers"
        actionText="Browse Products"
        onAction={onExplore}
      />
    </View>
  )
}

// Favorites Empty State
export const EmptyFavoritesScreen = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <View className="flex-1 bg-[#F9FAF9]">
      <EmptyState
        type="favorites"
        title="No Favorites Yet"
        description="Add your favorite farms and products to keep them handy"
        actionText="Explore Farms"
        onAction={onExplore}
      />
    </View>
  )
}

// Products Empty State
export const EmptyProductsScreen = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <View className="flex-1 bg-[#F9FAF9]">
      <EmptyState
        type="products"
        title="No Products Yet"
        description="Create your first product to start selling on AgriConnect"
        actionText="Add Product"
        onAction={onAdd}
      />
    </View>
  )
}

// Search Results Empty State
export const EmptySearchScreen = ({ query }: { query: string }) => {
  return (
    <View className="flex-1 bg-[#F9FAF9]">
      <EmptyState
        type="search"
        title="No Results Found"
        description={`No products found matching "${query}". Try different keywords.`}
      />
    </View>
  )
}
