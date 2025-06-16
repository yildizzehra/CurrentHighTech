import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function SignupPage() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carModel, setCarModel] = useState(""); // Araba modelini ekliyoruz
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !phoneNumber || !email || !password || !carModel) { // Araba modelini kontrol ediyoruz
      Alert.alert("Eksik Bilgi", "Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore'a kullanıcı bilgilerini kaydet
      /*await setDoc(doc(db, "users", user.uid), {
        fullName,
        phoneNumber,
        email,
        carModel, // Araba modelini de ekliyoruz
        createdAt: new Date(),
      });*/

      setLoading(false);
      Alert.alert("Tebrikler", "Kayıt başarılı!");
      navigation.replace("HomePage");
    } catch (error) {
      setLoading(false);
      Alert.alert("Kayıt Hatası", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={["#f8d7da", "#800000"]} style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inner}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Create Your Account</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#999" value={fullName} onChangeText={setFullName} />
            <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#999" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />
            <TextInput style={styles.input} placeholder="Car Model" placeholderTextColor="#999" value={carModel} onChangeText={setCarModel} /> {/* Araba modelini ekliyoruz */}

            <TouchableOpacity onPress={handleSignup} style={styles.signupButton} disabled={loading}>
              <LinearGradient colors={["#8B0000", "#800000"]} style={styles.signupButtonInner}>
                <Text style={styles.signupButtonText}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    gap: 16,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  signupButton: {
    marginTop: 12,
  },
  signupButtonInner: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
  footerLink: {
    color: "#FFBABA",
    fontWeight: "bold",
    fontSize: 14,
  },
});
