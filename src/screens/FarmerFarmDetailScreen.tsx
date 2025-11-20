import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, Bell, Edit } from "lucide-react-native";
import Carousel from "@/components/ui/Carousel";
import { FarmStatCard } from "@/components/farm/FarmStatCard";
import { SeasonCard, CropType } from "@/components/farm/SeasonCard";
import { FarmInfoCard } from "@/components/farm/FarmInfoCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "node_modules/@react-navigation/native-stack/lib/typescript/src/types";
import { FarmStackParamList } from "@/navigation/FarmNavigator";

// Dummy Data
const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
];

const FARM_DATA = {
  name: "Green Valley Farm",
  location: "Sonoma County, CA",
  size: 25,
  description:
    "Sustainable organic farm specializing in seasonal vegetables and herbs. Family-owned for three generations, committed to providing fresh, healthy produce to our local community.",
  logoUrl: {
    uri: "https://img.freepik.com/premium-vector/farm-logo-design-vector_9645-19.jpg", // Placeholder logo
  },
  activeSeasons: 8,
  activeSeasonsStatus: "Growing",
};

const SEASONS_DATA = [
  {
    id: "spring-2024",
    seasonName: "Spring 2024",
    crops: ["Leaf", "Carrot", "Wheat"] as CropType[],
    dateRange: "Mar 15 - Jun 30",
    acres: 8.5,
    status: "Growing" as const,
  },
  {
    id: "summer-2024",
    seasonName: "Summer 2024",
    crops: ["Apple", "Cherry"] as CropType[],
    dateRange: "Jun 1 - Sep 15",
    acres: 6.2,
    status: "Planting" as const,
  },
  {
    id: "fall-2024",
    seasonName: "Fall Harvest 2024",
    crops: ["Grape"] as CropType[],
    dateRange: "Aug 20 - Nov 30",
    acres: 10.3,
    status: "Harvesting" as const,
  },
];

type Nav = NativeStackNavigationProp<FarmStackParamList>;

export default function FarmDetailScreen() {
  const navigation = useNavigation<Nav>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onAddSeason = () => {
    console.log("Add New Season");
  }

  const onPressSeason = (seasonId: string) => {
    navigation.navigate("SeasonDetail", { seasonId });
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Custom Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-10">
        <View />
        <Text className="text-lg font-bold text-gray-900">Green Valley Farm</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FarmSetupInformation", { farmId: "" })
          }}
        >
          <Edit size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Carousel Header */}
        <Carousel images={CAROUSEL_IMAGES} height={220} autoScroll={false} />

        <View className="p-4">
          {/* Farm Info Card */}
          <FarmInfoCard
            name={FARM_DATA.name}
            location={FARM_DATA.location}
            size={FARM_DATA.size}
            description={FARM_DATA.description}
            logoUrl={FARM_DATA.logoUrl}
            activeSeasons={FARM_DATA.activeSeasons}
            activeSeasonsStatus={FARM_DATA.activeSeasonsStatus}
          />

          {/* Farm Statistics */}
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Farm Statistics
          </Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            <View className="w-[48%]">
              <FarmStatCard
                label="Total Lots"
                value="24"
                change="+5"
                icon="Grid"
                iconBg="#dcfce7" // green-100
                iconColor="#16a34a" // green-600
              />
            </View>
            <View className="w-[48%]">
              <FarmStatCard
                label="Active Products"
                value="47"
                change="+12"
                changeColor="#ea580c" // orange for +12 in image
                icon="Package"
                iconBg="#ffedd5" // orange-100
                iconColor="#ea580c" // orange-600
              />
            </View>
            <View className="w-[48%]">
              <FarmStatCard
                label="Productivity"
                value="85%"
                change="+18%"
                changeColor="#3b82f6" // blue
                icon="TrendingUp"
                iconBg="#e0f2fe" // sky-100
                iconColor="#0284c7" // sky-600
              />
            </View>
            <View className="w-[48%]">
              <FarmStatCard
                label="Active Seasons"
                value="8"
                change="+2"
                icon="Calendar"
                iconBg="#dcfce7"
                iconColor="#16a34a"
              />
            </View>
          </View>

          {/* Current Seasons */}
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-900">
              Current Seasons
            </Text>
            <TouchableOpacity
              onPress={onAddSeason}
              className="bg-green-500 px-3 py-2 rounded-lg">
              <Text className="text-white font-medium text-sm">
                Add New Season
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            {SEASONS_DATA.map((season, index) => (
              <SeasonCard
                key={index}
                seasonName={season.seasonName}
                crops={season.crops}
                dateRange={season.dateRange}
                acres={season.acres}
                status={season.status}
                onPress={() => onPressSeason(season.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
