import { useQuery } from "@tanstack/react-query";
import FarmService from "@/services/farm.service";
import { ordersService } from "@/services/orders.service";
import BatchService from "@/services/batches.service";
import { useAuthStore } from "@/stores/auth";
import { useMemo } from "react";
import { Order } from "@/types"; // Import Order type

export function useFarmDashboardData() {
    const { accountId } = useAuthStore();

    const { data: farm, isLoading: isLoadingFarm } = useQuery({
        queryKey: ["my-farm"],
        queryFn: FarmService.getFarmByMe,
        enabled: !!accountId,
    });

    const farmId = farm?.id;

    const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
        queryKey: ["farm-orders", farmId],
        queryFn: () => ordersService.getFarmOrders(farmId!),
        enabled: !!farmId,
    });

    const { data: batches = [], isLoading: isLoadingBatches } = useQuery({
        queryKey: ["farm-batches", farmId],
        queryFn: () => BatchService.getBatchesByFarm(farmId!),
        enabled: !!farmId,
    });

    const dashboardData = useMemo(() => {
        if (!farm) return null;

        // Calculate Earnings (Sum of completed orders)
        const completedOrders = orders.filter(
            (o: any) => o.orderStatus === "Delivered" || o.orderStatus === "Completed"
        );
        const totalEarnings = completedOrders.reduce(
            (sum: number, order: any) => sum + (order.totalPrice || 0),
            0
        );

        // Active Products (Batches with available quantity > 0)
        const activeBatches = batches.filter((b) => b.availableQuantity > 0);

        // New Orders (Pending or Processing)
        const newOrders = orders.filter(
            (o: any) => o.orderStatus === "Pending" || o.orderStatus === "Processing"
        );

        return {
            userName: farm?.farmName || "Farmer",
            userImageUrl: farm?.bannerUrl || "https://via.placeholder.com/150",
            earningsAmount: `$${totalEarnings.toLocaleString()}`,
            earningsPeriod: "Total", // Placeholder as we don't have historical data for trend
            activeProductsCount: activeBatches.length,
            activeProductsTrend: "0%", // Placeholder
            newOrdersCount: newOrders.length,
            newOrdersTrend: "0%", // Placeholder
            recentOrders: orders.slice(0, 5).map((order: any) => {
                const firstItem = order.orderItems?.[0];
                const productName = firstItem?.batch?.season?.product?.productName || order.orderCode || "Order";
                const imageUrl = firstItem?.batch?.imagesUrl?.[0] || "https://via.placeholder.com/50";

                return {
                    id: order.id.toString(),
                    name: productName,
                    orderNumber: order.orderCode || "",
                    quantity: `${order.orderItems?.length || 0} items`,
                    price: `$${order.totalPrice}`,
                    status: order.orderStatus,
                    statusColor: getStatusColor(order.orderStatus),
                    statusTextColor: getStatusTextColor(order.orderStatus),
                    image: imageUrl,
                };
            }),
        };
    }, [farm, orders, batches]);

    return {
        dashboardData,
        isLoading: isLoadingFarm || isLoadingOrders || isLoadingBatches,
    };
}

function getStatusColor(status: string) {
    switch (status) {
        case "Delivered":
        case "Completed":
            return "#C8E6C9";
        case "Processing":
            return "#FFE0B2";
        case "Pending":
            return "#E1F5FE";
        case "Cancelled":
            return "#FFCDD2";
        default:
            return "#E0E0E0";
    }
}

function getStatusTextColor(status: string) {
    switch (status) {
        case "Delivered":
        case "Completed":
            return "#2E7D32";
        case "Processing":
            return "#F57C00";
        case "Pending":
            return "#0277BD";
        case "Cancelled":
            return "#C62828";
        default:
            return "#757575";
    }
}
