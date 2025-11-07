import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react-native";
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen"
import { ExploreScreen } from "@/screens/ExploreScreen"
import { CustomerCartScreen } from "@/screens/CustomerCartScreen"
import { CustomerFavoritesScreen } from "@/screens/CustomerFavoritesScreen"
import ProfileScreen from "@/screens/ProfileScreen"
import CustomerOrdersScreen from "@/screens/CustomerOrdersScreen";
import FarmDetailScreen from "@/screens/FarmDetailScreen";

const Tab = createBottomTabNavigator()

const ACTIVE_COLOR = "#16a34a"
const INACTIVE_COLOR = "#9ca3af"

/* ----------------------------- Custom Tab Bar ----------------------------- */
function CustomTabBar({ state, descriptors, navigation }: any) {
    const insets = useSafeAreaInsets()

    return (
        <View
            style={[
                styles.customTabBar,
                {
                    paddingBottom: insets.bottom || 8,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            {state.routes.map((route: any, index: number) => {
                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                const { options } = descriptors[route.key]
                const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR
                const Icon = options.tabBarIcon?.({ color, size: 24, focused: isFocused })

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={0.7}
                    >
                        {Icon}
                        <Text style={[styles.tabLabel, { color }]} numberOfLines={1}>
                            {options.title || route.name}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

/* ------------------------------- Main Tabs ------------------------------- */
export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: ACTIVE_COLOR,
                tabBarInactiveTintColor: INACTIVE_COLOR,
                tabBarLabelStyle: { fontSize: 11, marginBottom: 0 },
                tabBarHideOnKeyboard: false,
                tabBarStyle: {
                    height: 56,
                    borderTopWidth: 0.5,
                    borderTopColor: "#e5e7eb",
                    backgroundColor: "#fff",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
                tabBarIcon: ({ color }) => {
                    const iconSize = 22
                    switch (route.name) {
                        case "Dashboard":
                            return <Home color={color} size={iconSize} />
                        case "Explore":
                            return <Search color={color} size={iconSize} />
                        case "Cart":
                            return <ShoppingCart color={color} size={iconSize} />
                        case "Favorites":
                            return <Heart color={color} size={iconSize} />
                        case "Profile":
                            return <User color={color} size={iconSize} />
                        default:
                            return <Home color={color} size={iconSize} />
                    }
                },
            })}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="Home" component={CustomerDashboardScreen} options={{ title: "Home" }} />
            <Tab.Screen name="Explore" component={ExploreScreen} options={{ title: "Explore" }} />
            <Tab.Screen name="Cart" component={FarmDetailScreen} options={{ title: "Cart" }} />
            {/* <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Cart" }} /> */}
            <Tab.Screen name="Favorites" component={CustomerFavoritesScreen} options={{ title: "Favorites" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        </Tab.Navigator>
    )
}

/* ------------------------------- Styles ------------------------------- */
const styles = StyleSheet.create({
    customTabBar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        borderTopWidth: 0.5,
        borderTopColor: "#e5e7eb",
        backgroundColor: "#fff",
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        gap: 4,
    },
    tabLabel: {
        fontSize: 11,
    },
})
