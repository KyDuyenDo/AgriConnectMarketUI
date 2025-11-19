import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, View, Text } from "react-native";

type ShoppingCartHeaderProps = { navigation: any };
export const ShoppingCartHeader = ({ navigation }: ShoppingCartHeaderProps) => (
    <View style={{
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        elevation: 4
    }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>

        <Text className="font-semibold text-[12px] text-[#4CAF50]">
            Clear all
        </Text>
    </View>
)
