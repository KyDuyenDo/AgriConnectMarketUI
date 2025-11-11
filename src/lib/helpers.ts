export const orderStatusConfig = {
  delivered: {
    backgroundColor: "#D4EDDA",
    textColor: "#155724",
    borderColor: "#C3E6CB",
  },
  shipped: {
    backgroundColor: "#D1ECF1",
    textColor: "#0C5460",
    borderColor: "#BEE5EB",
  },
  processing: {
    backgroundColor: "#FFF3CD",
    textColor: "#856404",
    borderColor: "#FFEAA7",
  },
  urgent: {
    backgroundColor: "#F8D7DA",
    textColor: "#721C24",
    borderColor: "#F5C6CB",
  },
}

export const getStatusColors = (status: string) => {
  return orderStatusConfig[status as keyof typeof orderStatusConfig] || orderStatusConfig.processing
}

export const calculateCartTotal = (items: any[], selectedIds: string[]) => {
  return selectedIds.reduce((sum, id) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      const value = Number.parseFloat(item.total.replace("$", ""))
      return sum + (isNaN(value) ? 0 : value)
    }
    return sum
  }, 0)
}

export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

export const calculateTax = (subtotal: number, taxRate = 0.08) => {
  return Number.parseFloat((subtotal * taxRate).toFixed(2))
}
