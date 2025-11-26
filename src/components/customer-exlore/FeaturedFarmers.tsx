import { ScrollView, View, Text } from "react-native"
import FarmFeatureCard from "./FarmFeatureCard";
import { Farm } from "@/types";

interface FeaturedFarmersProps {
    Farmers: Farm[];
}


export const FeaturedFarmers = ({ Farmers }: FeaturedFarmersProps) => {
    return (
        <View className="px-4">
            <ScrollView className="py-3 px-1" horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
                {Farmers.map((farm) => (
                    <View key={farm.id} className="mr-4">
                        <FarmFeatureCard
                            farm={farm}
                            style={{ width: 240 }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
