import React from 'react';
import { View, Text } from 'react-native';
import { ProductBatch } from '@/types/batch';
import { BatchRow } from './BatchRow';

interface BatchListProps {
    batches: ProductBatch[];
    onBatchPress?: (batch: ProductBatch) => void;
}

export const BatchList: React.FC<BatchListProps> = ({ batches, onBatchPress }) => {
    if (!batches || batches.length === 0) {
        return (
            <View className="py-8 items-center justify-center bg-white rounded-xl border border-dashed border-gray-300">
                <Text className="text-gray-400 text-center">No batches found for this season.</Text>
            </View>
        );
    }

    return (
        <View className="bg-white border-t border-b border-gray-200">
            <View className="py-3 bg-gray-50 border-b border-gray-200">
                <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Batches ({batches.length})
                </Text>
            </View>
            {batches.map((batch) => (
                <BatchRow
                    key={batch.id}
                    batch={batch}
                    onPress={() => onBatchPress && onBatchPress(batch)}
                />
            ))}
        </View>
    );
};
