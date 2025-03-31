import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../src/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../src/color';

export default function LoginScreen({ onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle user login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful', `Welcome, ${userCredential.user.email}!`, [
        { text: 'OK', onPress: onLoginSuccess },
      ]);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  // Handle user registration
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await auth.signOut();
      Alert.alert(
        'Registration Successful',
        'Registration successful! Please log in with your credentials.',
        [{ text: 'OK', onPress: () => setIsRegisterMode(false) }]
      );
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {/* Logo */}
        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          {isRegisterMode ? 'Register with AirSoft Elite' : 'AirSoft Elite'}
        </Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.customButton}
          onPress={isRegisterMode ? handleSignUp : handleLogin}
        >
          <Text style={styles.buttonText}>
            {isRegisterMode ? 'Register' : 'Log In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={toggleMode}
        >
          <Text style={styles.secondaryButtonText}>
            {isRegisterMode ? 'Return to Login' : 'Register here'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.odgreenLight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    fontWeight: 'bold',
    color: colors.desertLight,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontSize: 16,
    color: colors.desertLight,
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.desertLight,
    marginBottom: 16,
  },
  customButton: {
    width: '80%',
    height: 50,
    backgroundColor: colors.desertDark,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '80%',
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.desertDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  secondaryButtonText: {
    color: colors.desertLight,
    fontSize: 14,
    fontWeight: '500',
  },
});

