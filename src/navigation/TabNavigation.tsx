import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Box, ShoppingCart, Settings, User } from "lucide-react-native";

import { FarmerProductsScreen } from "@/screens/FarmerProductsScreen";
import { FarmerOrders } from "@/screens/FarmerOrdersScreen";
import { FarmDashboard } from "@/screens/FarmDashboard";
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen";
import ProfileScreen from "@/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = "#16a34a";
const INACTIVE_COLOR = "#9ca3af";

// ----------------------------- Custom Tab Bar -----------------------------
function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

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
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const { options } = descriptors[route.key];
        const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;
        const Icon = options.tabBarIcon?.({ color, size: 24, focused: isFocused });

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
        );
      })}
    </View>
  );
}

// ------------------------------- Main Tabs -------------------------------
export default function FarmTab() {
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
          const iconSize = 22;
          switch (route.name) {
            case "Dashboard":
              return <Home color={color} size={iconSize} />;
            case "Products":
              return <Box color={color} size={iconSize} />;
            case "Orders":
              return <ShoppingCart color={color} size={iconSize} />;
            case "FarmMgmt":
              return <Settings color={color} size={iconSize} />;
            case "Profile":
              return <User color={color} size={iconSize} />;
            default:
              return <Home color={color} size={iconSize} />;
          }
        },
      })}
      tabBar={(props) => <CustomTabBar {...props} />} // ✅ fix hook
    >
      <Tab.Screen name="Dashboard" component={FarmDashboard} options={{ title: "Dashboard" }} />
      <Tab.Screen name="Products" component={FarmerProductsScreen} options={{ title: "Products" }} />
      <Tab.Screen name="Orders" component={FarmerOrders} options={{ title: "Orders" }} />
      <Tab.Screen name="FarmMgmt" component={FarmDashboard} options={{ title: "Farm Mgmt" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}

// ------------------------------- Styles -------------------------------
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
});
