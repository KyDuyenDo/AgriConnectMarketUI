import { View, Text, Image } from 'react-native';
import { GraduationCap, Calendar } from 'lucide-react-native';

interface MeetFarmerProps {
    photo: string;
    name: string;
    title: string;
    education: string;
    experience: string;
    quote: string;
}

export function MeetFarmer({
    photo,
    name,
    title,
    education,
    experience,
    quote
}: MeetFarmerProps) {
    return (
        <View
            className="p-4 rounded-[20px] mx-4 mb-4"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            <View className="flex-row gap-4 mb-4">
                <Image
                    source={{ uri: photo }}
                    className="w-20 h-20 rounded-[20px]"
                />
                <View className="flex-1">
                    <Text className="text-lg font-semibold mb-1" style={{ color: '#1B1F24' }}>
                        {name}
                    </Text>
                    <Text className="text-sm mb-2" style={{ color: '#6B737A' }}>
                        {title}
                    </Text>

                    <View className="flex-row items-center gap-2 mb-2">
                        <GraduationCap size={16} color="#6B737A" />
                        <Text className="text-xs" style={{ color: '#6B737A' }}>
                            {education}
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <Calendar size={16} color="#6B737A" />
                        <Text className="text-xs" style={{ color: '#6B737A' }}>
                            {experience}
                        </Text>
                    </View>
                </View>
            </View>

            <Text className="text-sm leading-relaxed" style={{ color: '#2F3941' }}>
                {quote}
            </Text>
        </View>
    );
}
