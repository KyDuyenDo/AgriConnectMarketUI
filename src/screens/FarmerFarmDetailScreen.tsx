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
import { Edit, BarChart3, Award, Calendar, Package, Settings } from "lucide-react-native";
import Carousel from "@/components/ui/Carousel";
import { FarmInfoCard } from "@/components/farm/FarmInfoCard";
import { FarmManagementButton } from "@/components/farm/FarmManagementButton";
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
        contentContainerStyle={{ paddingBottom: 50 }}
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

          {/* Quick Statistics Overview */}
          <View className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
            <Text className="text-base font-bold text-gray-900 mb-3">
              Quick Overview
            </Text>
            {statsLoading ? (
              <ActivityIndicator size="small" color="#16a34a" />
            ) : statistics ? (
              <View className="flex-row flex-wrap">
                <View className="w-1/2 pr-2 mb-3">
                  <Text className="text-gray-500 text-xs mb-1">Total Batches</Text>
                  <Text className="text-gray-900 text-lg font-bold">
                    {statistics.totalBatches}
                  </Text>
                </View>
                <View className="w-1/2 pl-2 mb-3">
                  <Text className="text-gray-500 text-xs mb-1">Active Seasons</Text>
                  <Text className="text-gray-900 text-lg font-bold">
                    {statistics.totalSeasons}
                  </Text>
                </View>
                <View className="w-1/2 pr-2">
                  <Text className="text-gray-500 text-xs mb-1">Available</Text>
                  <Text className="text-gray-900 text-lg font-bold">
                    {statistics.totalAvailableQuantity}
                  </Text>
                </View>
                <View className="w-1/2 pl-2">
                  <Text className="text-gray-500 text-xs mb-1">Active Batches</Text>
                  <Text className="text-gray-900 text-lg font-bold">
                    {statistics.activeBatches}
                  </Text>
                </View>
              </View>
            ) : (
              <Text className="text-gray-400 text-sm">No statistics available</Text>
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
