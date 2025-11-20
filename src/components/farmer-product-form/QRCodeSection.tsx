import { View, Text, Image } from 'react-native';
import { Info } from 'lucide-react-native';

interface QRCodeSectionProps {
    qrImage: string;
    status: string;
    description: string;
}

export function QRCodeSection({ qrImage, status, description }: QRCodeSectionProps) {
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
                Product QR Code
            </Text>

            <View className="flex-row items-center">
                <View
                    className="w-20 h-20 rounded-xl items-center justify-center mr-4"
                    style={{ backgroundColor: '#F5F5F5' }}
                >
                    <Image
                        source={{ uri: qrImage }}
                        className="w-16 h-16"
                    />
                </View>

                <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                        <Info size={20} color="#52A8DB" className="mr-2" />
                        <Text className="text-[14px] font-medium" style={{ color: '#2D2D2D' }}>
                            {status}
                        </Text>
                    </View>
                    <Text className="text-[12px]" style={{ color: '#5C5C5C' }}>
                        {description}
                    </Text>
                </View>
            </View>
        </View>
    );
}
