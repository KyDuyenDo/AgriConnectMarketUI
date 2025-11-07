import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View, Text, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FarmerProductsScreen } from "@/screens/FarmerProductsScreen"
import { FarmerOrders } from "@/screens/FarmerOrdersScreen"
import { FarmDashboard } from "@/screens/FarmDashboard"
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen"
import { Home, Box, ShoppingCart, Settings, User } from "lucide-react-native"

const Tab = createBottomTabNavigator()

const ACTIVE_COLOR = "#16a34a"
const INACTIVE_COLOR = "#9ca3af"

function CustomTabBar(props: any) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.customTabBar,
        {
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {props.state.routes.map((route: any, index: number) => {
        const isFocused = props.state.index === index
        const onPress = () => {
          const event = props.navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name)
          }
        }

        return (
          <View key={route.key} style={styles.tabItem}>
            {props.descriptors[route.key].options.tabBarIcon?.({
              color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR,
              size: 24,
              focused: isFocused,
            })}
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR,
                },
              ]}
              onPress={onPress}
              numberOfLines={1}
            >
              {props.descriptors[route.key].options.title || route.name}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

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
          paddingTop: 0,
          paddingBottom: 0,
          borderTopWidth: 0.5,
          borderTopColor: "#e5e7eb",
          backgroundColor: "#fff",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarIcon: ({ color, size }) => {
          const iconSize = 22
          switch (route.name) {
            case "Dashboard":
              return <Home color={color} size={iconSize} />
            case "Products":
              return <Box color={color} size={iconSize} />
            case "Orders":
              return <ShoppingCart color={color} size={iconSize} />
            case "FarmMgmt":
              return <Settings color={color} size={iconSize} />
            case "Profile":
              return <User color={color} size={iconSize} />
            default:
              return <Home color={color} size={iconSize} />
          }
        },
      })}
      tabBar={CustomTabBar}
    >
      <Tab.Screen name="Dashboard" component={FarmDashboard} options={{ title: "Dashboard" }} />
      <Tab.Screen name="Products" component={FarmerProductsScreen} options={{ title: "Products" }} />
      <Tab.Screen name="Orders" component={FarmerOrders} options={{ title: "Orders" }} />
      <Tab.Screen name="FarmMgmt" component={FarmDashboard} options={{ title: "Farm Mgmt" }} />
      <Tab.Screen name="Profile" component={CustomerDashboardScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  customTabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
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
