import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react-native";
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen";
import  { ExploreScreen }  from "@/screens/ExploreScreen";


function CartScreen() { return <View style={styles.screen}><Text>Cart</Text></View> }
function FavoritesScreen() { return <View style={styles.screen}><Text>Favorites</Text></View> }
function ProfileScreen() { return <View style={styles.screen}><Text>Profile</Text></View> }

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = "#16a34a";
const INACTIVE_COLOR = "#9ca3af";

export default function CustomerTab() {
    const cartCount = 4; // bind this value from redux/context/props

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: ACTIVE_COLOR,
                tabBarInactiveTintColor: INACTIVE_COLOR,
                tabBarLabelStyle: { fontSize: 11, marginTop: 2 },
                tabBarHideOnKeyboard: false,
                tabBarStyle: {
                    height: 56,
                    paddingTop: 0,
                    paddingBottom: Platform.OS === "ios" ? 6 : 0,
                    margin: 0,
                    borderTopWidth: 0.5,
                    borderTopColor: "#e5e7eb",
                    backgroundColor: "#fff",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
                tabBarIcon: ({ color, size }) => {
                    const iconSize = 22;
                    switch (route.name) {
                        case "Home":
                            return <Home color={color} size={iconSize} />;
                        case "Explore":
                            return <Search color={color} size={iconSize} />;
                        case "Cart":
                            return (
                                <View style={{ width: 28, alignItems: "center" }}>
                                    <ShoppingCart color={color} size={iconSize} />
                                    {cartCount > 0 && (
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeText}>{cartCount}</Text>
                                        </View>
                                    )}
                                </View>
                            );
                        case "Favorites":
                            return <Heart color={color} size={iconSize} />;
                        case "Profile":
                            return <User color={color} size={iconSize} />;
                        default:
                            return <Home color={color} size={iconSize} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={CustomerDashboardScreen} options={{ title: "Home" }} />
            <Tab.Screen name="Explore" component={ExploreScreen} options={{ title: "Explore" }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Cart" }} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favorites" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, alignItems: "center", justifyContent: "center" },
    badge: {
        position: "absolute",
        top: -6,
        right: -10,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#16a34a",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
    },
    badgeText: { color: "#fff", fontSize: 11, fontWeight: "600" },
});