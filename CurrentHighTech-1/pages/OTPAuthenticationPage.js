// pages/OTPAuthenticationPage.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";

export default function OTPAuthenticationPage({ navigation }) {
  const [otp, setOtp] = useState("");

  return (
    <View style={styles.container}>
      {/* Logo ekledik */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Enter OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="rgba(0,0,0,0.3)" // Silik yazı rengi
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <Button
        title="Verify"
        color="#ff0000"
        onPress={() => navigation.navigate("HomePage")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Beyaz arka plan
    padding: 20,
  },
  logo: {
    width: 100, // Logo genişliği
    height: 100, // Logo yüksekliği
    marginBottom: 20, // Aradaki boşluk
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333", // Koyu yazı rengi
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 18,
    borderRadius: 5,
  },
});
