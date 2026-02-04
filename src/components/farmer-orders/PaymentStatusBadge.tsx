import { HandCoins } from "lucide-react-native"
import { View, Text } from "react-native"

interface PaymentStatusBadgeProps {
    status: string
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
    const isPaid = status.toLowerCase() === "paid"
    const bgColor = isPaid ? "bg-[#C8E6C9]" : "bg-[#FFCDD2]"
    const textColor = isPaid ? "text-[#4CAF50]" : "text-[#D32F2F]"
    const iconColor = isPaid ? "#4CAF50" : "#D32F2F"

    return (
        <View className={`${bgColor} rounded-full px-3 py-1 flex-row items-center gap-1`}>
            <HandCoins size={16} color={iconColor} />
            <Text className={`${textColor} text-xs font-semibold capitalize`}>
                {status || "Unpaid"}
            </Text>
        </View>
    )
}
