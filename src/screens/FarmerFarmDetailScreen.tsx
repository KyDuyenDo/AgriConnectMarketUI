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
import { Edit, BarChart3, Award, Calendar, Package, Settings, Package2, TrendingUp, Layers } from "lucide-react-native";
import Carousel from "@/components/ui/Carousel";
import { FarmInfoCard } from "@/components/farm/FarmInfoCard";
import { FarmManagementButton } from "@/components/farm/FarmManagementButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "node_modules/@react-navigation/native-stack/lib/typescript/src/types";
import { FarmStackParamList } from "@/navigation/types";
import { useSeasons } from "@/hooks/useSeasons";
import { useFarmByMe } from "@/hooks/useFarm";
import { useFarmStatistics } from "@/hooks/custom/useFarmStatistics";
import { FarmerFarmDetailScreenSkeleton } from "@/components/skeletons/FarmerFarmDetailScreenSkeleton";

type Nav = NativeStackNavigationProp<FarmStackParamList>;

export default function FarmDetailScreen() {
  const navigation = useNavigation<Nav>();
  const { data: farm, isLoading: farmLoading, error: farmError } = useFarmByMe();
  const { seasons, isLoading: seasonsLoading } = useSeasons(farm?.id);
  const { statistics, isLoading: statsLoading } = useFarmStatistics(farm?.id, farm?.farmerId);

  // Loading state
  if (farmLoading) {
    return <FarmerFarmDetailScreenSkeleton />;
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
  // Defensive check for bannerUrl
  const carouselImages = farm?.bannerUrl ? [farm.bannerUrl] : [];

  // Defensive check for address
  const farmLocation = farm?.address
    ? `${farm.address.ward || ''}, ${farm.address.district || ''}, ${farm.address.province || ''}`.replace(/^, |, , /g, '')
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
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Carousel Header */}
        {carouselImages.length > 0 && (
          <Carousel images={carouselImages} height={220} autoScroll={false} />
        )}

        <View className="p-4">
          {/* Farm Info Card */}
          <FarmInfoCard
            name={farm?.farmName || "My Farm"}
            location={farmLocation}
            size={farm?.area ? parseFloat(farm.area) || 0 : 0}
            description={farm?.farmDesc || "No description provided"}
            logoUrl={farm?.bannerUrl ? { uri: farm.bannerUrl } : require('../../assets/icon.png')}
            activeSeasons={seasons?.length || 0}
            activeSeasonsStatus={seasons && seasons.length > 0 ? "Active" : "No seasons"}
          />

          {/* Quick Statistics Overview */}
          <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Quick Overview
            </Text>
            {statsLoading ? (
              <View className="py-8">
                <ActivityIndicator size="small" color="#16a34a" />
              </View>
            ) : statistics ? (
              <View className="gap-2">
                {/* First Row */}
                <View className="flex-row gap-2">
                  {/* Total Batches Card */}
                  <View className="flex-1 bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="bg-blue-100 rounded-full p-1.5">
                        <Package2 size={16} color="#2563eb" strokeWidth={2.5} />
                      </View>
                    </View>
                    <Text className="text-blue-950 text-2xl font-bold -mt-1">
                      {statistics.totalBatches}
                    </Text>
                    <Text className="text-blue-600 text-xs font-medium">Total Batches</Text>
                  </View>

                  {/* Active Seasons Card */}
                  <View className="flex-1 bg-purple-50 rounded-xl p-3 border border-purple-100">
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="bg-purple-100 rounded-full p-1.5">
                        <Calendar size={16} color="#9333ea" strokeWidth={2.5} />
                      </View>
                    </View>
                    <Text className="text-purple-950 text-2xl font-bold -mt-1">
                      {statistics.totalSeasons}
                    </Text>
                    <Text className="text-purple-600 text-xs font-medium">Active Seasons</Text>
                  </View>
                </View>

                {/* Second Row */}
                <View className="flex-row gap-2">
                  {/* Available Quantity Card */}
                  <View className="flex-1 bg-green-50 rounded-xl p-3 border border-green-100">
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="bg-green-100 rounded-full p-1.5">
                        <TrendingUp size={16} color="#16a34a" strokeWidth={2.5} />
                      </View>
                    </View>
                    <Text className="text-green-950 text-2xl font-bold -mt-1">
                      {statistics.totalAvailableQuantity}
                    </Text>
                    <Text className="text-green-600 text-xs font-medium">Available</Text>
                  </View>

                  {/* Active Batches Card */}
                  <View className="flex-1 bg-orange-50 rounded-xl p-3 border border-orange-100">
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="bg-orange-100 rounded-full p-1.5">
                        <Layers size={16} color="#ea580c" strokeWidth={2.5} />
                      </View>
                    </View>
                    <Text className="text-orange-950 text-2xl font-bold -mt-1">
                      {statistics.activeBatches}
                    </Text>
                    <Text className="text-orange-600 text-xs font-medium">Active Batches</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View className="py-6">
                <Text className="text-gray-400 text-sm text-center">No statistics available</Text>
              </View>
            )}
          </View>

          {/* Farm Management Section */}
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Farm Management
          </Text>

          <FarmManagementButton
            icon={BarChart3}
            title="Statistics"
            onPress={() => navigation.navigate("FarmStatistics")}
            iconColor="#16a34a"
            iconBgColor="#dcfce7"
          />

          <FarmManagementButton
            icon={Award}
            title="Certificates"
            onPress={() => navigation.navigate("FarmCertificates", { farmId: farm.id })}
            iconColor="#ea580c"
            iconBgColor="#ffedd5"
          />

          <FarmManagementButton
            icon={Calendar}
            title="Seasons"
            onPress={() => navigation.navigate("FarmSeasons", { farmId: farm.id })}
            iconColor="#0284c7"
            iconBgColor="#e0f2fe"
          />

          <FarmManagementButton
            icon={Package}
            title="Products & Categories"
            onPress={() => navigation.navigate("FarmProductsManagement")}
            iconColor="#9333ea"
            iconBgColor="#f3e8ff"
          />

          <FarmManagementButton
            icon={Settings}
            title="Farm Settings"
            onPress={() => navigation.navigate("FarmSetupInformation", { farmId: farm.id })}
            iconColor="#6b7280"
            iconBgColor="#f3f4f6"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
