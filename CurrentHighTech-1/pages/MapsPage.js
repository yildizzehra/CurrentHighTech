// pages/MapsPage.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapsPage() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const stations = [
    {
      id: 1,
      name: "Tesla Supercharger",
      latitude: 37.78825,
      longitude: -122.4324,
    },
    {
      id: 2,
      name: "ChargePoint Station",
      latitude: 37.78925,
      longitude: -122.4314,
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Konum izni reddedildi!");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#800000" />
        <Text style={{ marginTop: 10 }}>Konum alınıyor...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Başlık + logo */}
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Şarj İstasyonları</Text>
      </View>

      {/* Harita */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Kullanıcının konumu */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          pinColor="blue"
          title="Senin Konumun"
        />

        {/* Şarj istasyonları */}
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    gap: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#800000",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
