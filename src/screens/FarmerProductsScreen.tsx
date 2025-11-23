import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Search, Filter, Star, MoreVertical, Edit, Trash2, Eye } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FarmStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useAllBatches } from "@/hooks/useBatches";
import { Batch } from "@/types";
import { useAuthStore } from "@/stores/auth";

type Nav = NativeStackNavigationProp<FarmStackParamList>;

const getBatchCode = (batch: Batch): string => {
  if (typeof batch.batchCode === 'string') return batch.batchCode;
  if (batch.batchCode && typeof batch.batchCode === 'object' && 'value' in batch.batchCode) {
    return (batch.batchCode as { value: string }).value;
  }
  return "Batch";
};

const getStockStatus = (batch: Batch): "In Stock" | "Low Stock" | "Out of Stock" => {
  const percentage = (batch.availableQuantity / batch.totalYield) * 100;
  if (percentage === 0) return "Out of Stock";
  if (percentage < 20) return "Low Stock";
  return "In Stock";
};

const getStockBadgeStyle = (stock: string) => {
  switch (stock) {
    case "In Stock":
      return { bg: "bg-[#C8E6C9]", text: "text-[#2E7D32]" };
    case "Low Stock":
      return { bg: "bg-[#FFE0B2]", text: "text-[#F57C00]" };
    case "Out of Stock":
      return { bg: "bg-[#FFCDD2]", text: "text-[#D32F2F]" };
    default:
      return { bg: "bg-[#C8E6C9]", text: "text-[#2E7D32]" };
  }
};

const getStockUnitColor = (stock: string) => {
  switch (stock) {
    case "Low Stock":
      return "text-[#F39C12]";
    case "Out of Stock":
      return "text-[#E74C3C]";
    default:
      return "text-[#5C5C5C]";
  }
};

const BatchCard = ({ batch, onPress, onEdit, onDelete }: {
  batch: Batch;
  onPress: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  const imageUrl = batch.imagesUrl && batch.imagesUrl.length > 0 ? batch.imagesUrl[0] : null;
  const batchCode = getBatchCode(batch);
  const stockStatus = getStockStatus(batch);
  const stockBadge = getStockBadgeStyle(stockStatus);
  const unitColor = getStockUnitColor(stockStatus);

  return (
    <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3" style={{ width: '48%' }}>
      {/* Product Image with Overlays */}
      <View className="relative">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-[120px]"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <View className="w-full h-[120px] bg-green-50 items-center justify-center">
            <Text className="text-green-600 font-bold text-lg">{batchCode}</Text>
          </View>
        )}

        {/* Stock Badge - Top Right */}
        <View className={`absolute top-2 right-2 flex-row items-center py-1 px-2 rounded-full ${stockBadge.bg}`}>
          <Text className={`text-[10px] font-medium ${stockBadge.text}`}>{stockStatus}</Text>
        </View>

        {/* Star Favorite - Top Left */}
        <TouchableOpacity className="absolute top-2 left-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <Star size={14} color={batch.isActive !== false ? "#FF8C42" : "#8A8A8A"} fill={batch.isActive !== false ? "#FF8C42" : "none"} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="p-3">
        {/* Batch Code and Menu */}
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-xs font-semibold text-[#2D2D2D] flex-1" numberOfLines={1}>{batchCode}</Text>
          <TouchableOpacity className="flex items-center justify-center w-6 h-6">
            <MoreVertical size={14} color="#8A8A8A" />
          </TouchableOpacity>
        </View>

        {/* Season */}
        {batch.season && (
          <Text className="text-[10px] text-[#8A8A8A] mb-2" numberOfLines={1}>Season: {batch.season.seasonName}</Text>
        )}

        {/* Price and Units */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm font-bold text-[#2D2D2D]">${batch.price}</Text>
          <Text className={`text-[10px] ${unitColor}`} numberOfLines={1}>{batch.availableQuantity}/{batch.totalYield}</Text>
        </View>

        {/* Planting Date */}
        <View className="mb-2">
          <Text className="text-[10px] text-[#8A8A8A]" numberOfLines={1}>
            {batch.plantingDate ? new Date(batch.plantingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-1">
          <TouchableOpacity
            onPress={onEdit}
            className="flex-1 flex items-center justify-center py-2 bg-[#E8F5E8] rounded-lg active:bg-green-100">
            <Edit size={14} color="#4CAF50" strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onDelete}
            className="flex-1 flex items-center justify-center py-2 bg-[#FDECEA] rounded-lg active:bg-red-100">
            <Trash2 size={14} color="#E74C3C" strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPress}
            className="flex-1 flex items-center justify-center py-2 bg-[#E3F2FD] rounded-lg active:bg-blue-100">
            <Eye size={14} color="#2196F3" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const FarmerProductsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { accountId } = useAuthStore();
  const { data: batches, isLoading } = useAllBatches(accountId || undefined, { enabled: !!accountId });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBatches = batches?.filter(b => {
    const code = getBatchCode(b);
    return (code || "").toLowerCase().includes(searchQuery.toLowerCase());
  });

  const onAddBatch = () => {
    navigation.navigate("AddLot", {});
  };

  const handleEdit = (batchId: string) => {
    // TODO: Navigate to edit batch screen
    console.log("Edit batch:", batchId);
  };

  const handleDelete = (batchId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete batch:", batchId);
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
          <View className="flex-row flex-wrap justify-between">
            {filteredBatches?.map(batch => (
              <BatchCard
                key={batch.id}
                batch={batch}
                onPress={() => navigation.navigate("LotDetail", { lotId: batch.id })}
                onEdit={() => handleEdit(batch.id)}
                onDelete={() => handleDelete(batch.id)}
              />
            ))}
          </View>
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
