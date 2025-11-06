import { ScrollView } from "react-native"
import FarmFeatureCard from "./FarmFeatureCard";

interface Farmers {
    id: number;
    image: string;
    name: string;
    location: string;
    distance: string;
    rating: number;
    reviews: number;
    tags: string[];
}
interface FeaturedFarmersProps {
    Farmers: Farmers[];
}


export const FeaturedFarmers = ({ Farmers }: FeaturedFarmersProps) => {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Farmers.map((farmer) => (
                <FarmFeatureCard
                    key={farmer.id}
                    image={farmer.image}
                    name={farmer.name}
                    location={farmer.location}
                    distance={farmer.distance}
                    rating={farmer.rating}
                    reviews={farmer.reviews}
                    tags={farmer.tags}
                />
            ))}
        </ScrollView>
    )
}