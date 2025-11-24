import { ScrollView, View, Text } from "react-native"
import FarmFeatureCard from "./FarmFeatureCard";
import { Farm } from "@/types";

interface FeaturedFarmersProps {
    Farmers: Farm[];
}


export const FeaturedFarmers = ({ Farmers }: FeaturedFarmersProps) => {
    return (
        <View className="px-4">
            <ScrollView className="py-3 px-1" horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: "100%" }}>
                {Farmers.map((farm) => (
                    <FarmFeatureCard
                        key={farm.id}
                        farm={farm}
                        style={{ width: "100%" }}
                    />
                ))}
            </ScrollView>
        </View>
    )
}
