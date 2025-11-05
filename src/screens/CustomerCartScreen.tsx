import CartItemsSection from "@/components/customer-cart/CartItemsSection"
import DeliveryOptionsCard from "@/components/customer-cart/DeliveryOptionsCard";
import { OrderSummary } from "@/components/customer-cart/OrderSummary";
import ProceedButton from "@/components/customer-cart/ProceedButton";
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const cartItems = [
    {
        id: "1",
        name: "Organic Tomatoes",
        farm: "Green Valley Farm",
        status: "Fresh",
        harvested: "2 days ago",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
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
        image:
            "https://upload.wikimedia.org/wikipedia/commons/2/26/Spinach_leaves.jpg",
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
        tagColor: "bg-yellow-100 text-yellow-700",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/3/3e/Carrots_of_many_colors.jpg",
        unit: "lbs",
        price: "$3.25/lb",
        total: "$9.75",
        quantity: 3,
    },
    {
        id: "4",
        name: "Fresh Kale",
        farm: "Sunny Acres Farm",
        status: "Fresh",
        harvested: "today",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/8/8c/Kale-Bundle.jpg",
        unit: "bunch",
        price: "$2.75/bunch",
        total: "$2.75",
        quantity: 1,
    },
];

const orderData = {
    subtotal: 25.25,
    itemCount: 4,
    deliveryFee: 3.99,
    discountLabel: "FRESH20",
    discountAmount: 5.05,
    tax: 2.12,
    total: 26.31,
    savedMessage: "You saved $5.05 with promo code!",
};

export const CustomerCartScreen: React.FC = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 24 }}
            >
                <CartItemsSection items={cartItems} />
                <View className="flex-1 bg-gray-50">
                    <DeliveryOptionsCard />
                </View>

                <OrderSummary {...orderData} />
                <ProceedButton onPress={() => console.log("Proceed to Checkout pressed")} />
            </ScrollView>

        </SafeAreaView>
    )
}