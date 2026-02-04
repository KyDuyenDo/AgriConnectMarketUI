import { View, Text, TouchableOpacity, Alert, Linking } from "react-native"
import { StatusBadge } from "./StatusBadge"
import { PaymentStatusBadge } from "./PaymentStatusBadge"
import { OrderProducts } from "./OrderProducts"
import { OrderMetadata } from "./OrderMetadata"
import { OrderActions } from "./OrderActions"
import { Order } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { formatDate } from "@/utils/date"
import { useUpdateOrderStatus, useCancelOrder } from "@/hooks/useOrders"

interface OrderCardProps {
  order: any
  isPreOrder?: boolean
}

export function OrderCard({ order, isPreOrder }: OrderCardProps) {
  const navigation = useNavigation<any>()
  const leftBorder = order.orderStatus === "urgent" ? "border-l-4 border-[#D32F2F]" : ""

  const handlePress = () => {
    navigation.navigate("FarmerOrderDetail", { orderId: order.id, isPreOrder })
  }

  // Map backend status to UI status
  const getStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered": return "delivered"
      case "shipped": return "shipped"
      case "shipping": return "shipped"
      case "processing": return "processing"
      case "pending": return "pending"
      case "canceled": return "canceled"
      default: return "pending"
    }
  }

  const status = getStatus(order.orderStatus)

  const { mutate: updateStatus } = useUpdateOrderStatus()
  const { mutate: cancelOrder } = useCancelOrder()

  const handleUpdateStatus = (newStatus: string) => {
    Alert.alert(
      "Confirm Update",
      `Are you sure you want to update status to ${newStatus}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => updateStatus({ orderId: order.id, status: newStatus }) }
      ]
    )
  }

  const handleCancel = () => {
    cancelOrder(order.orderId)
  }

  const handleCall = () => {
    const phoneNumber = order.customer?.phone
    if (!phoneNumber) {
      Alert.alert("No Phone Number", "This customer has not provided a phone number.")
      return
    }

    Alert.alert(
      "Contact Customer",
      `Choose an action for ${phoneNumber}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => Linking.openURL(`tel:${phoneNumber}`) },
        { text: "Message", onPress: () => Linking.openURL(`sms:${phoneNumber}`) }
      ]
    )
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View className={`bg-white rounded-2xl mx-4 p-4 mb-3 ${leftBorder}`}>
        {/* Header */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-row items-center gap-2">
            <StatusBadge status={status as any} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </View>
          <Text className="text-[#8A8A8A] text-xs">{formatDate(order.orderDate)}</Text>
        </View>

        {/* Order Info */}
        <View className="flex-row justify-between items-center mb-3">
          <View>
            <Text className="text-[#2D2D2D] font-semibold text-sm">{order.orderCode}</Text>
            <Text className="text-[#5C5C5C] text-xs">Customer: {order.customer?.fullname || "Customer"}</Text>
          </View>
          <Text className="text-base font-bold text-[#2D2D2D]">{new Intl.NumberFormat('vi-VN').format(order.totalPrice)} đ</Text>
        </View>

        {
          order.orderItems?.map((item: any, idx: number) => {
            return (
              <View key={idx} className="flex-row gap-3 mb-2">
                <OrderProducts products={item} />
              </View>
            )
          })
        }

        {/* <OrderMetadata
          message={order.message}
          rating={order.rating}
          deliveryTime={order.deliveryTime}
          address={order.address}
          timeline={order.timeline}
        /> */}

        <OrderActions status={status as any} paymentStatus={order.paymentStatus} paymentMethod={order.paymentMethod} onUpdateStatus={handleUpdateStatus} onCancel={handleCancel} onCall={handleCall} />
      </View>
    </TouchableOpacity>
  )
}
