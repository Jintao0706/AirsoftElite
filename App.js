import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './src/firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth'; // Add this import
import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';
import ProfileScreen from './Screen/ProfileScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(null); // null means "not yet loaded"

  // Listen for changes in the Firebase Auth user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If a user is logged in, we check their profile completion status
        setIsLoggedIn(true);
        checkProfileCompletion(user);
      } else {
        // If no user, user is logged out => show login
        setIsLoggedIn(false);
        setProfileCompleted(false); // So we don't show ProfileScreen
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  // Check if the user has completed their profile
  const checkProfileCompletion = async (user) => {
    const key = `profileCompleted:${user.uid}`;
    try {
      const flag = await AsyncStorage.getItem(key);
      setProfileCompleted(flag === 'true');
    } catch (error) {
      console.error('Error reading profile flag', error);
      setProfileCompleted(false);
    }
  };

  // Called from LoginScreen after successful login
  const handleLoginSuccess = () => {

  };

  // Called from ProfileScreen after user saves their profile
  const handleProfileComplete = async () => {
    const user = auth.currentUser;
    if (user) {
      const key = `profileCompleted:${user.uid}`;
      await AsyncStorage.setItem(key, 'true');
    }
    setProfileCompleted(true);
  };

  // Flow control
  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  } else if (profileCompleted === null) {
    // still checking or setting the profileCompleted flag
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  } else if (!profileCompleted) {
    // user logged in but hasn't completed profile
    return <ProfileScreen onProfileComplete={handleProfileComplete} />;
  } else {
    // user logged in and profile completed
    return <HomeScreen />;
  }
}




