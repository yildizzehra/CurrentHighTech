import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // Import an icon library

// Other page components
import SearchPage from "./SearchPage";
import ProfilePage from "./ProfilePage";
import MapsPage from "./MapsPage";

const Tab = createBottomTabNavigator();

export default function HomePage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Assign icons based on route name
          if (route.name === "Search") {
            iconName = "search-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          } else if (route.name === "Maps") {
            iconName = "map-outline";
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff0000", // Active tab color
        tabBarInactiveTintColor: "#ccc", // Inactive tab color
        headerShown: false, // Hide header
        tabBarStyle: {
          backgroundColor: "#fff", // Bottom menu background color
        },
      })}
    >
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Maps" component={MapsPage} />
    </Tab.Navigator>
  );
}
