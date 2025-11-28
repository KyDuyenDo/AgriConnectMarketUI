import { useState, useCallback } from "react"
import { View, Text, ScrollView, StatusBar, TouchableOpacity, RefreshControl } from "react-native"
import { useNavigation, useRoute, type RouteProp, useFocusEffect } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, ChevronLeft, Plus } from "lucide-react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { FarmStackParamList } from "@/navigation/types"
import { useSeasons } from "@/hooks/useSeasons"
import { SeasonCard } from "@/components/farm-seasons/SeasonCard"
import { SearchBar } from "@/components/farm-seasons/SearchBar"
import { SortDropdown } from "@/components/farm-seasons/SortDropdown"
import { useQuery } from "@tanstack/react-query"
import BatchService from "@/services/batches.service"
import { FarmSeasonsScreenSkeleton } from "@/components/skeletons/FarmSeasonsScreenSkeleton"


type Nav = NativeStackNavigationProp<FarmStackParamList>
type RouteParams = RouteProp<FarmStackParamList, "FarmSeasons">

export default function FarmSeasonsScreen() {
    const navigation = useNavigation<Nav>()
    const route = useRoute<RouteParams>()
    const { farmId } = route.params

    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState<string>("date")

    const {
        data: seasonsData,
        isLoading: isLoadingSeasons,
        refetch: refetchSeasons,
        seasons: filteredSeasons,
    } = useSeasons(farmId, {
        search,
        sortBy: sortBy as any,
    })

    const {
        data: allBatches,
        isLoading: isLoadingBatches,
        refetch: refetchBatches,
    } = useQuery({
        queryKey: ["farm-batches", farmId],
        queryFn: () => BatchService.getBatchesByFarm(farmId),
        enabled: !!farmId,
    })

    const onRefresh = useCallback(() => {
        refetchSeasons()
        refetchBatches()
    }, [refetchSeasons, refetchBatches])

    useFocusEffect(
        useCallback(() => {
            onRefresh()
        }, [onRefresh]),
    )

    const onPressSeason = (seasonId: string) => {
        navigation.navigate("SeasonDetail", { seasonId })
    }

    const sortOptions = [
        { label: "Newest Date", value: "date" },
        { label: "Status", value: "status" },
        { label: "Category", value: "category" },
        { label: "Product Name", value: "product" },
    ]

    const isLoading = isLoadingSeasons || isLoadingBatches
    const displaySeasons = filteredSeasons || []
    const hasSeasons = displaySeasons.length > 0

    return isLoading ? (
        <FarmSeasonsScreenSkeleton />
    ) : (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                <View className="flex-row items-center flex-1">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="flex-row items-center gap-2"
                    >
                        <View className="w-5 h-5 items-center justify-center">
                            <ChevronLeft size={20} color="#4CAF50" />
                        </View>
                    </TouchableOpacity>
                    <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddSeason", { farmId })}
                    className="bg-green-500 w-8 h-8 rounded-full items-center justify-center"
                >
                    <Plus size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Controls */}
            <View className="px-4 py-3 bg-white border-b border-gray-100 z-10">
                <View className="mb-3">
                    <SearchBar value={search} onChangeText={setSearch} placeholder="Search seasons..." />
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-gray-500">{displaySeasons.length} seasons found</Text>
                    <SortDropdown options={sortOptions} selectedValue={sortBy} onSelect={setSortBy} />
                </View>
            </View>

            {!hasSeasons ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1, justifyContent: "center", paddingHorizontal: 16 }}
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={["#16a34a"]} />}
                >
                    <View className="bg-white rounded-xl p-8 items-center shadow-sm">
                        <Text className="text-gray-500 text-center text-base mb-4">
                            {search ? "No seasons match your search" : "No seasons found"}
                        </Text>
                        <Text className="text-gray-400 text-center text-sm mb-6">
                            {search ? "Try a different keyword" : "Start by creating your first farming season"}
                        </Text>
                        {!search && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("AddSeason", { farmId })}
                                className="bg-green-500 px-6 py-3 rounded-lg"
                            >
                                <Text className="text-white font-semibold">Create Season</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={["#16a34a"]} />}
                >
                    <View>
                        {displaySeasons.map((season) => {
                            const seasonBatches = allBatches?.filter((b: any) => b.seasonId === season.id) || []
                            const totalBatch = seasonBatches.length
                            const totalYield = seasonBatches.reduce((sum: number, b: any) => sum + (b.totalYield || 0), 0)
                            const productName = season.product?.productName
                            const category = season.product?.category?.categoryName

                            return (
                                <SeasonCard
                                    key={season.id}
                                    season={season}
                                    onPress={() => onPressSeason(season.id)}
                                    totalBatch={totalBatch}
                                    totalYield={totalYield}
                                    productName={productName}
                                    category={category}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    )
}
