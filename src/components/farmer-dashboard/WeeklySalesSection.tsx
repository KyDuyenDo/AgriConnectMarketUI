import { View, Text, Image } from "react-native"

export function WeeklySalesSection() {
    return (
        <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#2D2D2D" }}>Weekly Sales Overview</Text>
            <View style={{
                backgroundColor: "#FFFFFF",
                padding: 16,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Image
                    source={{ uri: "https://static.paraflowcontent.com/public/resource/image/21641efe-068c-427b-8441-880b044e9143.svg" }}
                    style={{ width: 320, height: 200, maxWidth: "100%" }}
                    resizeMode="contain"
                />
            </View>
        </View>
    )
}
