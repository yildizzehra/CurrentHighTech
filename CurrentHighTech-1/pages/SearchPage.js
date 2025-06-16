import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const logoScale = new Animated.Value(1);

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);
    Animated.loop(pulse).start();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigation.navigate("HomePage", { screen: "Maps", query: searchQuery });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={["#f8d7da", "#800000"]} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inner}
        >
          {/* Logo */}
          <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
          </Animated.View>

          {/* Başlık */}
          <Text style={styles.title}>Discover Places</Text>

          {/* Arama Kutusu */}
          <View style={styles.inputContainer}>
            <Icon name="magnify" size={22} color="#800000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Search e.g. Cafe, Pizza..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
          </View>

          {/* Arama Butonu */}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <LinearGradient colors={["#8B0000", "#800000"]} style={styles.searchButtonInner}>
              <Text style={styles.buttonText}>Search</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Geri Butonu */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    marginBottom: 15,
  },
  searchButtonInner: {
    borderRadius: 30,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  backButton: {
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
