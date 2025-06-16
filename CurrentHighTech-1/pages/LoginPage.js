import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("HomePage");
    } catch (error) {
      Alert.alert("Giriş Hatası", error.message);
    }
  };

  const handleSignup = async () => {
    try {
      if (!fullName || !phoneNumber || !email || !password) {
        Alert.alert("Error", "Please fill out all fields.");
        return;
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Firestore verisini kaydediyoruz
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        phoneNumber,
        email,
        createdAt: new Date()
      });
  
      // Başarılı işlem sonrası yönlendirme
      Alert.alert("Success", "You have successfully signed up.");
      navigation.navigate("HomePage"); // Kayıt olduktan sonra ana sayfaya yönlendiriyoruz
    } catch (error) {
      // Hata durumunda kullanıcıya bilgi veriyoruz
      Alert.alert("Signup Error", error.message);
    }
  };
  

  const handleGoogleSignup = () => {
    Alert.alert("Uyarı", "Google ile giriş henüz uygulanmadı.");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={["#f8d7da", "#800000"]} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inner}
        >
          <View style={styles.logoContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <LinearGradient colors={["#8B0000", "#800000"]} style={styles.loginButtonInner}>
                <Text style={styles.loginText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign Up with Email */}
            <TouchableOpacity onPress={handleSignup} style={styles.loginButton}>
              <LinearGradient colors={["#8B0000", "#800000"]} style={styles.loginButtonInner}>
                <Icon name="email-outline" size={18} color="#fff" />
                <Text style={styles.signupEmailText}>
                  {loading ? "Loading..." : "Login with Email"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign Up with Google */}
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignup}>
              <LinearGradient colors={["#8B0000", "#800000"]} style={styles.socialButtonInner}>
                <Icon name="google" size={18} color="#fff" />
                <Text style={styles.socialText}>Login with Google</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Already have an account? */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't you have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignupPage")}>
            <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

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
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
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
  loginButton: {
    marginTop: 10,
  },
  loginButtonInner: {
    backgroundColor: "#800000",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupEmailText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "normal",
  },
  socialButton: {
    marginTop: 10,
  },
  socialButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  socialText: {
    color: "#fff",
    fontSize: 15,
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
