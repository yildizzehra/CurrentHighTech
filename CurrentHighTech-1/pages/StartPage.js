import React, { useEffect, useRef } from "react";
import {
  View, Text, StyleSheet, Image, Animated,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function StartPage() {
  const navigation = useNavigation();
  const logoPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoPosition, {
      toValue: -80,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [logoPosition]);

  return (
    <LinearGradient colors={["#f8d7da", "#800000"]} style={styles.container}>
      <Animated.Image
        source={require("../assets/logo.png")}
        style={[styles.logo, { transform: [{ translateY: logoPosition }] }]}
      />
      <Text style={styles.title}>CurrentHighTechnology </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("LoginPage")}
        style={styles.button}
      >
        <LinearGradient colors={["#8B0000", "#800000"]} style={styles.buttonInner}>
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignupPage")}
        style={styles.button}
      >
        <LinearGradient colors={["#8B0000", "#800000"]} style={styles.buttonInner}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
    textAlign: "center",
  },
  button: {
    width: "80%",
    marginVertical: 10,
  },
  buttonInner: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
