import { View, Text, Pressable } from 'react-native';
import { Image as ImageIcon } from 'lucide-react-native';

interface ImageUploadProps {
    onPress?: () => void;
}

export function ImageUpload({ onPress }: ImageUploadProps) {
    return (
        <View
            className="text-center mb-4 p-8 border-2 border-dashed rounded-[20px]"
            style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E8EAEB'
            }}
        >
            <View
                className="w-16 h-16 rounded-full items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#F5F7F5' }}
            >
                <ImageIcon size={32} color="#4CAF50" />
            </View>

            <Text className="text-base font-medium mb-2" style={{ color: '#1B1F24' }}>
                Add Farm Photos
            </Text>

            <Text className="text-sm mb-4" style={{ color: '#6B737A' }}>
                Upload images of your farm, crops, and facilities
            </Text>

            <Pressable
                onPress={onPress}
                className="py-3 px-6 rounded-[20px] mx-auto active:bg-[#43A047]"
                style={{
                    backgroundColor: '#4CAF50',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 2
                }}
            >
                <Text className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                    Choose Files
                </Text>
            </Pressable>
        </View>
    );
}
