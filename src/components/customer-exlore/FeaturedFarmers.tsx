import { ScrollView, View, Text } from "react-native"
import FarmFeatureCard from "./FarmFeatureCard";
import { Farm } from "@/types";

interface FeaturedFarmersProps {
    Farmers: Farm[];
}


export const FeaturedFarmers = ({ Farmers }: FeaturedFarmersProps) => {
    return (
        <View className="px-4 mb-4">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-[16px] font-semibold" style={{ color: '#1B1F24' }}>
                    Featured Farmers
                </Text>
                <Text className="text-[12px] font-medium" style={{ color: '#4CAF50' }}>
                    View All
                </Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="">
                {Farmers.map((farm) => (
                    <FarmFeatureCard
                        key={farm.id}
                        farm={farm}
                    />
                ))}
            </ScrollView>
        </View>
    )
}
