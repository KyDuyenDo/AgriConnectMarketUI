import { useQuery } from "@tanstack/react-query";
import FarmService from "@/services/farm.service";
import { ordersService } from "@/services/orders.service";
import BatchService from "@/services/batches.service";
import { useAuthStore } from "@/stores/auth";
import { useEffect, useMemo } from "react";
import { useGetProfile } from "@/hooks/useProfile";

export function useFarmDashboardData() {
    const { accountId } = useAuthStore();

    const { data: farmer, isLoading: farmerLoading } = useGetProfile();

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

        // Calculate Earnings
        const completedOrders = orders.filter(
            (o: any) =>
                o.orderStatus === "Delivered" ||
                o.orderStatus === "Completed"
        );

        const totalEarnings = completedOrders.reduce(
            (sum: number, order: any) => sum + (order.totalPrice || 0),
            0
        );

        // Active Batches
        const activeBatches = batches.filter((b: any) => b.availableQuantity > 0);

        // New Orders
        const newOrders = orders.filter(
            (o: any) =>
                o.orderStatus === "Pending" ||
                o.orderStatus === "Processing"
        );

        return {
            earningsAmount: `${totalEarnings.toLocaleString()} đ`,
            earningsPeriod: "",
            activeProductsCount: activeBatches.length,
            activeProductsTrend: "",
            newOrdersCount: newOrders.length,
            newOrdersTrend: "",

            recentOrders: orders.slice(0, 5).map((order: any) => {
                const orderItems = order.orderItems?.flat() || [];
                const firstItem = orderItems[0];

                const totalQuantity = orderItems.reduce(
                    (sum: number, item: any) => sum + (item.quantity || 0),
                    0
                );

                const batchId = firstItem?.batchId;
                const batch = batches.find((b: any) => b.id === batchId);

                // FIX: always have a product name
                const productName =
                    (typeof batch?.season === "object"
                        ? batch?.season?.product?.productName
                        : undefined) ||
                    firstItem?.productName ||
                    order.orderCode ||
                    "Order";
                const imageUrl =
                    batch?.imageUrls?.[0] ||
                    firstItem?.imageUrl ||
                    "https://picsum.photos/50";

                return {
                    id: order.id.toString(),
                    name: productName,
                    orderNumber:
                        order.orderCode?.length > 20
                            ? order.orderCode.substring(0, 20) + "..."
                            : order.orderCode,
                    quantity: `${totalQuantity} ${batch?.units}`,
                    price: order.totalPrice,
                    status: order.orderStatus,
                    statusColor: getStatusColor(order.orderStatus),
                    statusTextColor: getStatusTextColor(order.orderStatus),
                    image: imageUrl,
                };
            }),
        };
    }, [farm, orders, batches, farmer]);

    return {
        dashboardData,
        farmer,
        isLoading:
            isLoadingFarm ||
            isLoadingOrders ||
            isLoadingBatches ||
            farmerLoading,
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
