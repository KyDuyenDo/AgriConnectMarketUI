import { View, Image, Pressable } from 'react-native';
import { X } from 'lucide-react-native';

interface ImagePreviewProps {
    uri: string;
    onRemove?: () => void;
}

export function ImagePreview({ uri, onRemove }: ImagePreviewProps) {
    return (
        <View className="relative overflow-hidden rounded-[12px]" style={{ aspectRatio: 1 }}>
            <Image
                source={{ uri }}
                className="w-full h-full"
                resizeMode="cover"
            />

            {onRemove && (
                <Pressable
                    onPress={onRemove}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full items-center justify-center"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                    }}
                >
                    <X size={16} color="#6B737A" />
                </Pressable>
            )}
        </View>
    );
}
