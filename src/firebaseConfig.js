import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getFirestore } from "firebase/firestore";



// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChTZsEh17S_yc2hA0RaEKubw-dGsJ5j28",
  authDomain: "airsoftelite.firebaseapp.com",
  projectId: "airsoftelite",
  storageBucket: "airsoftelite.firebasestorage.app",
  messagingSenderId: "377499109679",
  appId: "1:377499109679:web:57f39d19bdde3ed7adb9da"
};


// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebase_app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// get the firestore database object
export const db = getFirestore(firebase_app);