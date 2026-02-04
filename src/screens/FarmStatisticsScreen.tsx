import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FarmService from "@/services/farm.service";
import { RevenueStatistic, TopCustomerStats, BestSellingProductStats } from "@/types/farm";
import { colors } from "@/constants/colors";

const screenWidth = Dimensions.get("window").width;

const FarmStatisticsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { farmId } = route.params as { farmId: string };

    const [loading, setLoading] = useState(true);
    const [revenueData, setRevenueData] = useState<RevenueStatistic[]>([]);
    const [topCustomers, setTopCustomers] = useState<TopCustomerStats[]>([]);
    const [topProducts, setTopProducts] = useState<BestSellingProductStats[]>([]);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        fetchData();
    }, [farmId, year]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [revenueRes, customersRes, productsRes] = await Promise.all([
                FarmService.getFarmRevenue(farmId, year),
                FarmService.getTopCustomers(farmId),
                FarmService.getTopProducts(farmId),
            ]);

            setRevenueData(revenueRes || []);
            setTopCustomers(customersRes || []);
            setTopProducts(productsRes || []);
        } catch (error) {
            // console.error("Error fetching statistics:", error);
            // Suppress error or handle it. The backend returns 400 if no data, which throws error.
            // But if it's 404/400 for empty data, we might want to just show empty state.
            // For now, assume empty if error.
            setRevenueData([]);
            setTopCustomers([]);
            setTopProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const formatRevenueData = () => {
        if (!revenueData.length) return { labels: [], datasets: [{ data: [] }] };

        return {
            labels: revenueData.map((d) => `M${parseInt(d.month)}`),
            datasets: [
                {
                    data: revenueData.map((d) => d.amount / 1000000),
                },
            ],
        };
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Farm Statistics</Text>
            <View style={{ width: 24 }} />
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                {renderHeader()}
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Revenue Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Revenue {year} (Million VND)</Text>
                    {revenueData.length > 0 ? (
                        <LineChart
                            data={formatRevenueData()}
                            width={screenWidth - 64}
                            height={220}
                            chartConfig={{
                                backgroundColor: "#ffffff",
                                backgroundGradientFrom: "#ffffff",
                                backgroundGradientTo: "#ffffff",
                                decimalPlaces: 1,
                                color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                    stroke: "#166534",
                                },
                            }}
                            bezier
                            style={styles.chart}
                        />
                    ) : (
                        <Text style={styles.noDataText}>No revenue data available</Text>
                    )}
                </View>

                {/* Top Products Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Best Selling Products</Text>
                    {topProducts.length > 0 ? (
                        <View>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderText, { flex: 0.5, textAlign: 'center' }]}>#</Text>
                                <Text style={[styles.tableHeaderText, { flex: 2 }]}>Product</Text>
                                <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Sold</Text>
                            </View>
                            {topProducts.map((item, index) => (
                                <View key={item.product.productId} style={styles.tableRow}>
                                    <View style={[styles.rankBadge, { width: 24, height: 24, alignSelf: 'center', marginLeft: 0, marginRight: 0 }]}>
                                        <Text style={styles.rankText}>{index + 1}</Text>
                                    </View>
                                    <Text style={[styles.tableCellText, { flex: 2, paddingLeft: 8 }]} numberOfLines={1}>{item.product.productName}</Text>
                                    <Text style={[styles.tableCellText, { flex: 1, textAlign: 'right', fontWeight: '600', color: colors.primary }]}>{item.amount}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.noDataText}>No product data available</Text>
                    )}
                </View>

                {/* Top Customers Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Top Customers</Text>
                    {topCustomers.length > 0 ? (
                        <View>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderText, { flex: 0.5, textAlign: 'center' }]}>#</Text>
                                <Text style={[styles.tableHeaderText, { flex: 2 }]}>Customer</Text>
                                <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Orders</Text>
                            </View>
                            {topCustomers.map((item, index) => (
                                <View key={item.customer.customerId} style={styles.tableRow}>
                                    <View style={[styles.rankBadge, { backgroundColor: index < 3 ? '#FFD700' : '#E5E7EB', width: 24, height: 24, alignSelf: 'center', marginLeft: 0, marginRight: 0 }]}>
                                        <Text style={[styles.rankText, { color: index < 3 ? '#fff' : '#374151' }]}>{index + 1}</Text>
                                    </View>
                                    <View style={{ flex: 2, paddingLeft: 8 }}>
                                        <Text style={styles.tableCellText} numberOfLines={1}>{item.customer.fullname || item.customer.email}</Text>
                                        <Text style={styles.itemSubText} numberOfLines={1}>{item.customer.email}</Text>
                                    </View>
                                    <Text style={[styles.tableCellText, { flex: 1, textAlign: 'right', fontWeight: '600' }]}>{item.amount}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.noDataText}>No customer data available</Text>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
    },
    backButton: {
        padding: 4,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    sectionContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 16,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    noDataText: {
        textAlign: "center",
        color: "#6B7280",
        marginVertical: 20,
    },
    // Table Styles
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 8,
        marginBottom: 8,
    },
    tableHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6B7280',
        textTransform: 'uppercase',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    tableCellText: {
        fontSize: 14,
        color: '#1F2937',
    },
    rankBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
    },
    rankText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#374151",
    },
    itemSubText: {
        fontSize: 12,
        color: "#6B7280",
    },
});

export default FarmStatisticsScreen;
