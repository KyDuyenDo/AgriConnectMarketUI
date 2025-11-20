import { View, Text, Image } from 'react-native';
import { Mail, Phone, MapPin } from 'lucide-react-native';

interface CustomerInfoProps {
    name: string;
    photo: string;
    memberSince: string;
    email: string;
    phone: string;
    address: string[];
}

export function CustomerInfo({ name, photo, memberSince, email, phone, address }: CustomerInfoProps) {
    return (
        <View
            className="p-6 rounded-[20px] mx-4 mb-4"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            <Text className="text-lg font-semibold mb-4" style={{ color: '#1B1F24' }}>
                Customer Information
            </Text>

            <View className="flex-row items-start gap-4">
                <Image source={{ uri: photo }} className="w-15 h-15 rounded-full" />
                <View className="flex-1">
                    <View className="mb-2">
                        <Text className="text-base font-semibold" style={{ color: '#1B1F24' }}>
                            {name}
                        </Text>
                        <Text className="text-sm" style={{ color: '#6B737A' }}>
                            {memberSince}
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-3 mb-2">
                        <Mail size={16} color="#6B737A" />
                        <Text className="text-sm" style={{ color: '#6B737A' }}>
                            {email}
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-3 mb-2">
                        <Phone size={16} color="#6B737A" />
                        <Text className="text-sm" style={{ color: '#6B737A' }}>
                            {phone}
                        </Text>
                    </View>

                    <View className="flex-row items-start gap-3">
                        <MapPin size={16} color="#6B737A" style={{ marginTop: 2 }} />
                        <View className="flex-1">
                            {address.map((line, i) => (
                                <Text key={i} className="text-sm" style={{ color: '#6B737A' }}>
                                    {line}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
