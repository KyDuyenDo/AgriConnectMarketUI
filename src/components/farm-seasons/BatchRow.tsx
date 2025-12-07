import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Batch } from '@/types';
import { ChevronRight, Calendar, Package, Scale, MoreVertical, Edit, Trash2, Eye, Star, DollarSign } from 'lucide-react-native';
import { BatchActionModal } from '@/components/modals/BatchActionModal';
import BatchService from '@/services/batches.service';
import { useQueryClient } from '@tanstack/react-query';

interface BatchRowProps {
    batch: Batch;
    onPress?: () => void;
}

export const BatchRow: React.FC<BatchRowProps> = ({ batch, onPress }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [modalMode, setModalMode] = React.useState<'harvest' | 'sell'>('sell');
    const queryClient = useQueryClient();

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getBatchCode = (code: any) => {
        if (typeof code === 'string') return code;
        return code?.value || 'Unknown Code';
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

    // @ts-ignore - handling potential type mismatch for imagesUrl
    const imageUrl = (batch.imagesUrl && batch.imagesUrl.length > 0)
        // @ts-ignore
        ? batch.imagesUrl[0]
        : null;

    const batchCode = getBatchCode(batch.batchCode);
    const stockStatus = getStockStatus(batch);
    const stockBadge = getStockBadgeStyle(stockStatus);

    const handleSellPress = () => {
        setModalMode('sell');
        setIsModalVisible(true);
    };

    const handleActionSubmit = async (data: any) => {
        try {
            if (modalMode === 'sell') {
                await BatchService.sell(batch.id, {
                    availableQuantity: data.availableQuantity,
                    price: data.price
                });
            } else {
                await BatchService.harvest(batch.id, data.totalYield);
            }
            // Invalidate queries to refresh the list
            queryClient.invalidateQueries({ queryKey: ['batches'] });
            queryClient.invalidateQueries({ queryKey: ['batch', batch.id] });
        } catch (error) {
            console.error('Failed to update batch:', error);
            // Optionally show error toast
        }
    };

    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden flex-row border border-gray-100"
                activeOpacity={0.7}
            >
                {/* Image Section */}
                <View className="w-28 h-28 relative">
                    {imageUrl ? (
                        <Image
                            source={{ uri: imageUrl }}
                            className="w-full h-full"
                            style={{ objectFit: "cover" }}
                        />
                    ) : (
                        <View className="w-full h-full bg-green-50 items-center justify-center">
                            <Text className="text-green-600 font-bold text-sm">{batchCode}</Text>
                        </View>
                    )}
                    {/* Status Badge on Image */}
                    <View className={`absolute top-2 left-2 py-1 px-2 rounded-full ${stockBadge.bg}`}>
                        <Text className={`text-[10px] font-medium ${stockBadge.text}`}>{stockStatus}</Text>
                    </View>
                </View>

                {/* Content Section */}
                <View className="flex-1 p-3 justify-between">
                    <View className="flex-row justify-between items-start">
                        <View className="flex-1 mr-2">
                            <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
                                {batchCode}
                            </Text>
                            {batch.season && (
                                <Text className="text-[10px] text-gray-500 mt-0.5" numberOfLines={1}>
                                    {batch.season.seasonName}
                                </Text>
                            )}
                        </View>

                        {/* Sell Action Button */}
                        <TouchableOpacity
                            onPress={handleSellPress}
                            className="flex-row items-center bg-green-50 px-2 py-1 rounded-full border border-green-100"
                        >
                            <DollarSign size={14} color="#16a34a" className="mr-1" />
                            <Text className="text-xs font-bold text-green-700">
                                ${batch.price}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center justify-between mt-2">
                        <View className="flex-row items-center bg-gray-50 px-2 py-1 rounded-lg">
                            <Scale size={12} color="#6b7280" className="mr-1" />
                            <Text className="text-xs text-gray-600">
                                {batch.availableQuantity}/{batch.totalYield} {batch.units}
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Calendar size={12} color="#9ca3af" className="mr-1" />
                            <Text className="text-[10px] text-gray-400">
                                {formatDate(batch.plantingDate)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Chevron */}
                <View className="justify-center pr-3 border-l border-gray-50 pl-2">
                    <ChevronRight size={18} color="#d1d5db" />
                </View>
            </TouchableOpacity>

            <BatchActionModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                mode={modalMode}
                batch={batch}
                onSubmit={handleActionSubmit}
                units={batch.units}
            />
        </>
    );
};
