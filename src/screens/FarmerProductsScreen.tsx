import React, { useState } from "react";
import { View, ScrollView, Platform, TouchableOpacity, Text, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Search, Filter } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FarmStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useAllBatches } from "@/hooks/useBatches";
import { Batch } from "@/types";

type Nav = NativeStackNavigationProp<FarmStackParamList>;

const BatchCard = ({ batch, onPress }: { batch: Batch; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-2xl p-3 mb-3 shadow-sm flex-row items-center"
  >
    <View className="w-20 h-20 bg-gray-100 rounded-xl mr-4 overflow-hidden">
      {/* Placeholder image since Batch doesn't have image directly yet, maybe from season/product? */}
      <View className="w-full h-full items-center justify-center bg-green-50">
        <Text className="text-green-600 font-bold text-xs text-center p-1">{batch.batchCode || "Batch"}</Text>
      </View>
    </View>
    <View className="flex-1">
      <View className="flex-row justify-between items-start">
        <Text className="text-[#2d2d2d] font-semibold text-base mb-1">{batch.batchCode || "Unnamed Batch"}</Text>
        <View className={`px-2 py-1 rounded-full ${batch.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
          <Text className={`text-xs font-medium ${batch.isActive ? 'text-green-600' : 'text-gray-500'}`}>
            {batch.isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>
      <Text className="text-[#5c5c5c] text-sm mb-1">Yield: {batch.totalYield} {batch.units}</Text>
      <Text className="text-[#4CAF50] font-bold text-sm">${batch.price}/{batch.units}</Text>
    </View>
  </TouchableOpacity>
);

export const FarmerProductsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { data: batches, isLoading } = useAllBatches();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBatches = batches?.filter(b =>
    (b.batchCode || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onAddBatch = () => {
    // Navigate to AddBatchScreen without seasonId, so user must select season
    navigation.navigate("AddLot", {});
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]" edges={['top']}>
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-[#2d2d2d] text-xl font-bold">My Batches</Text>
        <TouchableOpacity>
          <Filter size={20} color="#2d2d2d" />
        </TouchableOpacity>
      </View>

      <View className="px-6 py-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-2">
          <Search size={20} color="#9ca3af" />
          <Text className="ml-2 text-gray-400">Search batches...</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#4CAF50" className="mt-10" />
        ) : (
          filteredBatches?.map(batch => (
            <BatchCard
              key={batch.id}
              batch={batch}
              onPress={() => navigation.navigate("LotDetail", { lotId: batch.id })}
            />
          ))
        )}
        {!isLoading && filteredBatches?.length === 0 && (
          <Text className="text-center text-gray-500 mt-10">No batches found.</Text>
        )}
      </ScrollView>

      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          onPress={onAddBatch}
          className="bg-[#4CAF50] w-14 h-14 rounded-full items-center justify-center shadow-lg"
          style={{ elevation: 5 }}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
