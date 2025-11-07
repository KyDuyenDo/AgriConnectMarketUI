export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Delivered":
      return "bg-[#C8E6C9]"
    case "In Transit":
      return "bg-[#FFE0B2]"
    default:
      return "bg-gray-100"
  }
}

export const getStatusTextColor = (status: string): string => {
  switch (status) {
    case "Delivered":
      return "text-[#2E7D32]"
    case "In Transit":
      return "text-[#F57C00]"
    default:
      return "text-gray-700"
  }
}

export const getOrderStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    delivered: "bg-[#C8E6C9]",
    shipped: "bg-[#E1F5FE]",
    processing: "bg-[#FFF3E0]",
    pending: "bg-[#F3E5F5]",
    urgent: "bg-[#FFEBEE]",
  }
  return statusColors[status] || "bg-gray-100"
}

export const getOrderStatusTextColor = (status: string): string => {
  const statusTextColors: Record<string, string> = {
    delivered: "text-[#2E7D32]",
    shipped: "text-[#01579B]",
    processing: "text-[#E65100]",
    pending: "text-[#4A148C]",
    urgent: "text-[#B71C1C]",
  }
  return statusTextColors[status] || "text-gray-700"
}
