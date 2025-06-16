// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native"; // Import StatusBar

// Pages
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OTPAuthenticationPage from "./pages/OTPAuthenticationPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import MapsPage from "./pages/MapsPage";
import ReachedPage from "./pages/ReachedPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      {/* Add StatusBar to make the top bar visible */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage" id={"nav"}>
          <Stack.Screen
            name="StartPage"
            component={StartPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{
              headerShown: false,
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="SignupPage"
            component={SignupPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OTPAuthenticationPage"
            component={OTPAuthenticationPage}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{
              headerLeft: null,
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="SearchPage"
            component={SearchPage}
            options={{
              headerLeft: null,
              headerShown: false,
            }}
          />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="MapsPage" component={MapsPage} />
          <Stack.Screen name="ReachedPage" component={ReachedPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
