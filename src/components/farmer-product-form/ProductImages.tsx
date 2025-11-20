import { View, Text, Pressable } from 'react-native';
import { Camera, Plus } from 'lucide-react-native';

interface ImageSlot {
    uri?: string;
    isMain?: boolean;
}

interface ProductImagesProps {
    images: ImageSlot[];
    onAddImage: (index: number) => void;
    onRemoveImage?: (index: number) => void;
}

export function ProductImages({ images, onAddImage, onRemoveImage }: ProductImagesProps) {
    const MAX_IMAGES = 6;
    const slots = Array(MAX_IMAGES).fill(null).map((_, i) => images[i] || {});

    return (
        <View
            className="p-4 rounded-2xl mx-4 mb-4"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            <Text className="text-[16px] font-semibold mb-3" style={{ color: '#2D2D2D' }}>
                Product Images
            </Text>

            <View className="grid grid-cols-3 gap-3">
                {slots.map((slot, index) => (
                    <Pressable
                        key={index}
                        onPress={() => onAddImage(index)}
                        className="aspect-square rounded-xl overflow-hidden justify-center items-center"
                        style={{
                            backgroundColor: index === 0 ? '#F7F8F7' : '#F5F5F5',
                            borderWidth: index === 0 ? 2 : 1,
                            borderColor: index === 0 ? '#4CAF50' : '#E8E8E8',
                            borderStyle: 'dashed'
                        }}
                    >
                        {slot.uri ? (
                            <View className="w-full h-full relative">
                                {/* Image would go here */}
                                {slot.isMain && (
                                    <View
                                        className="absolute bottom-2 left-2 px-2 py-0.5 rounded-sm"
                                        style={{ backgroundColor: '#FF8C42' }}
                                    >
                                        <Text className="text-[10px] font-medium" style={{ color: '#FFFFFF' }}>
                                            Main
                                        </Text>
                                    </View>
                                )}
                            </View>
                        ) : (
                            <View className="items-center">
                                {index === 0 ? (
                                    <>
                                        <Camera size={32} color="#4CAF50" className="mb-2" />
                                        <Text className="text-[10px] font-medium text-center" style={{ color: '#4CAF50' }}>
                                            Main Photo
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Plus size={24} color="#8A8A8A" className="mb-1" />
                                        <Text className="text-[10px] text-center" style={{ color: '#8A8A8A' }}>
                                            Add Photo
                                        </Text>
                                    </>
                                )}
                            </View>
                        )}
                    </Pressable>
                ))}
            </View>

            <Text className="mt-3 text-[12px]" style={{ color: '#8A8A8A' }}>
                Upload up to 6 high-quality photos. First image will be the main product photo.
            </Text>
        </View>
    );
}
