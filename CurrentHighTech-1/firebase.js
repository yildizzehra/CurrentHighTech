import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsrIP3cGNKG-eqdIDG7j9yBOPkEhjyAn4",
  authDomain: "currenthightech-5bdaa.firebaseapp.com",
  projectId: "currenthightech-5bdaa",
  storageBucket: "currenthightech-5bdaa.appspot.com",
  messagingSenderId: "364038615399",
  appId: "1:364038615399:web:159032d5455fbe0b397fc2",
  measurementId: "G-L7RT1RZZ49"
};

const app = initializeApp(firebaseConfig);

// 🔐 Kalıcı oturum için AsyncStorage'ı burada sağla:
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
