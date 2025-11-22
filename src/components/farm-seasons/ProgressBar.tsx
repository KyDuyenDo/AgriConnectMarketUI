import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
    progress: number; // 0 to 100
    color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = '#22c55e' }) => {
    const clampedProgress = Math.max(0, Math.min(100, progress));

    return (
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
            <View
                className="h-full rounded-full"
                style={{ width: `${clampedProgress}%`, backgroundColor: color }}
            />
        </View>
    );
};
