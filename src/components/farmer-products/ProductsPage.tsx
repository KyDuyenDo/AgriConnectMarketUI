import type React from "react"
import { useState } from "react"
import { Header } from "./Header"
import { ActionButtons } from "./ActionButtons"
import { FilterSection } from "./FilterSection"
import { ProductGrid } from "./ProductGrid"

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPrice, setSelectedPrice] = useState("")
  const [selectedStock, setSelectedStock] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex-1 bg-white min-h-screen">
      <Header />
      <div className="px-4 py-4">
        <ActionButtons />
      </div>
      <div className="px-4 pb-4">
        <FilterSection
          onCategoryChange={setSelectedCategory}
          onPriceChange={setSelectedPrice}
          onStockChange={setSelectedStock}
          onSearchChange={setSearchQuery}
        />
      </div>
      <ProductGrid searchQuery={searchQuery} />
    </div>
  )
}
