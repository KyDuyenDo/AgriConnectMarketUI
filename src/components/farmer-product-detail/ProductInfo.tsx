import { View, Text, TouchableOpacity } from 'react-native';
import { Sprout, Calendar, Tag, Layers, Package, Scale, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState } from 'react';

interface ProductInfoProps {
    name: string;
    farm: string;
    price: string;
    unit: string;
    description: string;
    batchCode: string;
    category: string;
    season: string;
    plantingDate: string;
    harvestDate: string;
    availableQuantity: number;
    totalYield: number;
}

export function ProductInfo({
    name,
    farm,
    price,
    unit,
    description,
    batchCode,
    category,
    season,
    plantingDate,
    harvestDate,
    availableQuantity,
    totalYield
}: ProductInfoProps) {
    const [expanded, setExpanded] = useState(false);

    const DetailItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
        <View className="flex-row items-center w-[48%] mb-4">
            <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mr-3">
                <Icon size={20} color="#16A34A" />
            </View>
            <View className="flex-1">
                <Text className="text-xs text-gray-500 font-medium mb-0.5">{label}</Text>
                <Text className="text-sm text-gray-900 font-semibold" numberOfLines={1}>{value}</Text>
            </View>
        </View>
    );

    return (
        <View className="mx-4 mt-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            {/* Header Section */}
            <View className="mb-5 border-b border-gray-100 pb-5">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1 mr-4">
                        <Text className="text-sm font-bold text-green-600 tracking-wide uppercase mb-1">{farm}</Text>
                        <Text className="text-2xl font-bold text-gray-900 leading-tight">{name}</Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-2xl font-bold text-green-700">{new Intl.NumberFormat('vi-VN').format(Number(price) || 0)} VNĐ</Text>
                        <Text className="text-xs text-gray-500 font-medium">per {unit}</Text>
                    </View>
                </View>
            </View>

            {/* Description Section */}
            <View className="mb-6">
                <Text className="text-sm font-bold text-gray-900 mb-2">About this product</Text>
                <Text
                    className="text-gray-600 leading-6 text-sm"
                    numberOfLines={expanded ? undefined : 3}
                >
                    {description}
                </Text>
                {description.length > 150 && (
                    <TouchableOpacity
                        onPress={() => setExpanded(!expanded)}
                        className="flex-row items-center mt-2"
                    >
                        <Text className="text-green-600 font-medium text-sm mr-1">
                            {expanded ? 'Show less' : 'Read more'}
                        </Text>
                        {expanded ? (
                            <ChevronUp size={16} color="#16A34A" />
                        ) : (
                            <ChevronDown size={16} color="#16A34A" />
                        )}
                    </TouchableOpacity>
                )}
            </View>

            {/* Details Grid */}
            <View className="flex-row flex-wrap justify-between">
                <DetailItem
                    icon={Package}
                    label="Batch Code"
                    value={batchCode}
                />
                <DetailItem
                    icon={Tag}
                    label="Category"
                    value={category}
                />
                <DetailItem
                    icon={Layers}
                    label="Season"
                    value={season}
                />
                <DetailItem
                    icon={Scale}
                    label="Stock"
                    value={`${availableQuantity} / ${totalYield} ${unit}`}
                />
                <DetailItem
                    icon={Sprout}
                    label="Planted"
                    value={new Date(plantingDate).toLocaleDateString()}
                />
                <DetailItem
                    icon={Calendar}
                    label="Harvested"
                    value={new Date(harvestDate).toLocaleDateString()}
                />
            </View>
        </View>
    );
}
