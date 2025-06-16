// pages/ReachedPage.js
import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function ReachedPage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo ekledik */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>You've Reached Your Destination!</Text>

      <Button
        title="Back to Home"
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
    marginBottom: 20, // Logo ile başlık arasında boşluk
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333", // Koyu yazı rengi
    textAlign: "center",
  },
});
