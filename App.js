import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './src/firebaseConfig'; 
import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';
import ProfileScreen from './Screen/ProfileScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(null); // null means "not yet loaded"

  // After login, check local storage for *this user's* profile completion flag
  useEffect(() => {
    const checkProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        // If somehow isLoggedIn but no user, default to false
        setProfileCompleted(false);
        return;
      }

      const key = `profileCompleted:${user.uid}`; // Per-user key
      try {
        const flag = await AsyncStorage.getItem(key);
        setProfileCompleted(flag === 'true');
      } catch (error) {
        console.error('Error reading profile flag', error);
        setProfileCompleted(false);
      }
    };

    if (isLoggedIn) {
      checkProfile();
    }
  }, [isLoggedIn]);

  // Called from LoginScreen after successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setProfileCompleted(null); // reset while check
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



