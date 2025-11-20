import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ShoppingCartHeaderProps = { onClearAll: () => void };

export const ShoppingCartHeader = ({ onClearAll }: ShoppingCartHeaderProps) => {
    const insets = useSafeAreaInsets(); // tránh notch / tai thỏ

    return (
        <View
            style={[
                styles.container,
                { paddingTop: insets.top, height: 56 + insets.top }
            ]}
        >
            <Text style={{ fontSize: 20, fontWeight: "600", flex: 1}}>
                Shopping Cart
            </Text>
            {/* Nút Clear all bên phải */}
            <TouchableOpacity onPress={onClearAll}>
                <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#F9FAF9",
        justifyContent: "flex-end",
    },
    clearText: {
        fontWeight: "600",
        fontSize: 12,
        color: "#4CAF50",
    },
});
