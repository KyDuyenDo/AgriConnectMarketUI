import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Edit } from "lucide-react-native";
import Carousel from "@/components/ui/Carousel";
import { FarmStatCard } from "@/components/farm/FarmStatCard";
import { SeasonCard, CropType, formatDateRange } from "@/components/farm/SeasonCard";
import { FarmInfoCard } from "@/components/farm/FarmInfoCard";
import { CertificateManager } from "@/components/farm/CertificateManager";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "node_modules/@react-navigation/native-stack/lib/typescript/src/types";
import { FarmStackParamList } from "@/navigation/FarmNavigator";
import { useSeasons } from "@/hooks/useSeasons";
import { useFarmByMe } from "@/hooks/useFarm";
import { useFarmStatistics } from "@/hooks/custom/useFarmStatistics";

type Nav = NativeStackNavigationProp<FarmStackParamList>;

export default function FarmDetailScreen() {
  const navigation = useNavigation<Nav>();
  const { data: farm, isLoading: farmLoading, error: farmError } = useFarmByMe();
  const { data: seasons, isLoading: seasonsLoading } = useSeasons();
  const { statistics, isLoading: statsLoading } = useFarmStatistics();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onPressSeason = (seasonId: string) => {
    navigation.navigate("SeasonDetail", { seasonId });
  };

  // Loading state
  if (farmLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#16a34a" />
          <Text className="text-gray-600 mt-4">Loading farm information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // New farmer - no farm data
  if (farmError || !farm) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        {/* Custom Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <View />
          <Text className="text-lg font-bold text-gray-900">Farm Management</Text>
          <View />
        </View>

        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full">
            <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
              Welcome to Farm Management
            </Text>
            <Text className="text-gray-600 text-center mb-6 leading-6">
              Please set up your farm information to get started. This will help customers find and learn about your farm.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("FarmSetupInformation", { farmId: "" })}
              className="bg-green-500 py-4 px-6 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-base">Set Up Farm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Existing farmer - display farm data
  const carouselImages = farm.bannerUrl ? [farm.bannerUrl] : [];
  const farmLocation = farm.address
    ? `${farm.address.ward}, ${farm.address.district}, ${farm.address.province}`
    : "Location not specified";

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Custom Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-10">
        <View />
        <Text className="text-lg font-bold text-gray-900">{farm.farmName}</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FarmSetupInformation", { farmId: farm.id })
          }}
        >
          <Edit size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Carousel Header */}
        {carouselImages.length > 0 && (
          <Carousel images={carouselImages} height={220} autoScroll={false} />
        )}

        <View className="p-4">
          {/* Farm Info Card */}
          <FarmInfoCard
            name={farm.farmName}
            location={farmLocation}
            size={farm.area ? parseFloat(farm.area) : 0}
            description={farm.farmDesc || "No description provided"}
            logoUrl={{ uri: farm.bannerUrl || "" }}
            activeSeasons={seasons?.length || 0}
            activeSeasonsStatus={seasons && seasons.length > 0 ? "Active" : "No seasons"}
          />

          {/* Certificate Management */}
          <CertificateManager
            farmId={farm.id}
            certificateUrl={farm.certificateUrl}
          />

          {/* Farm Statistics */}
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Farm Statistics
          </Text>

          {statsLoading ? (
            <View className="bg-white rounded-xl p-6 mb-6">
              <ActivityIndicator size="small" color="#16a34a" />
            </View>
          ) : statistics ? (
            <View className="flex-row flex-wrap gap-3 mb-6">
              <View className="w-[48%]">
                <FarmStatCard
                  label="Total Batches"
                  value={statistics.totalBatches.toString()}
                  change=""
                  icon="Grid"
                  iconBg="#dcfce7" // green-100
                  iconColor="#16a34a" // green-600
                />
              </View>
              <View className="w-[48%]">
                <FarmStatCard
                  label="Total Seasons"
                  value={statistics.totalSeasons.toString()}
                  change=""
                  icon="Calendar"
                  iconBg="#dcfce7"
                  iconColor="#16a34a"
                />
              </View>
              <View className="w-[48%]">
                <FarmStatCard
                  label="Available Quantity"
                  value={statistics.totalAvailableQuantity.toString()}
                  change=""
                  icon="Package"
                  iconBg="#ffedd5" // orange-100
                  iconColor="#ea580c" // orange-600
                />
              </View>
              <View className="w-[48%]">
                <FarmStatCard
                  label="Active Batches"
                  value={statistics.activeBatches.toString()}
                  change=""
                  icon="TrendingUp"
                  iconBg="#e0f2fe" // sky-100
                  iconColor="#0284c7" // sky-600
                />
              </View>
            </View>
          ) : (
            <View className="bg-white rounded-xl p-6 mb-6">
              <Text className="text-gray-500 text-center">No statistics available</Text>
            </View>
          )}

          {/* Management Actions */}
          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={() => navigation.navigate("AddCategory")}
              className="flex-1 bg-blue-50 p-4 rounded-xl items-center border border-blue-100"
            >
              <Text className="text-blue-700 font-semibold">Add Category</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddProduct")}
              className="flex-1 bg-purple-50 p-4 rounded-xl items-center border border-purple-100"
            >
              <Text className="text-purple-700 font-semibold">Add Product</Text>
            </TouchableOpacity>
          </View>

          {/* Current Seasons */}
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-900">
              Current Seasons
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddSeason", { farmId: farm.id })}
              className="bg-green-500 px-3 py-2 rounded-lg">
              <Text className="text-white font-medium text-sm">
                Add New Season
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            {seasonsLoading ? (
              <View className="bg-white rounded-xl p-6">
                <ActivityIndicator size="small" color="#16a34a" />
              </View>
            ) : seasons && seasons.length > 0 ? (
              seasons.map((season, index) => (
                <SeasonCard
                  key={season.id || index}
                  seasonName={season.seasonName}
                  crops={season.product ? [season.product.productName as CropType] : []}
                  dateRange={formatDateRange(season.startDate, season.endDate)}
                  acres={0} // TODO: Add acres to Season model
                  status={season.status as any}
                  onPress={() => onPressSeason(season.id)}
                  categoryName={season.product?.category?.categoryName}
                  productName={season.product?.productName}
                  categoryImageUrl={season.product?.category?.illustrativeImageUrl}
                />
              ))
            ) : (
              <View className="bg-white rounded-xl p-6">
                <Text className="text-gray-500 text-center">No seasons found</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
