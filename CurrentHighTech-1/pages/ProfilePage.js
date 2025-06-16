import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfilePage() {
  return (
    <LinearGradient colors={["#f8d7da", "#800000"]} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Your Profile</Text>
      </View>

      {/* E-mail */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>user@example.com</Text>
      </View>

      {/* Full Name */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>Zehra Yildiz</Text>
      </View>

      {/* Car Model */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Car Model</Text>
        <Text style={styles.value}>Tesla</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.button}>
        <LinearGradient colors={["#8B0000", "#800000"]} style={styles.buttonInner}>
          <Text style={styles.buttonText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    //paddingTop: 20, // İstersen bunu da biraz azaltabilirsin
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100, // yukarıdan boşluk veriyoruz
    marginBottom: 60,
  },
  
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  infoBox: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "300",
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
  buttonInner: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
