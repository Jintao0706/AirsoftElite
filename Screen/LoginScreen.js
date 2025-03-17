import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
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
      // Immediately sign the user out
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


  // REGISTRATION MODE
  if (isRegisterMode) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Logo Image */}
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')} 
            resizeMode="contain"
          />

          <Text style={styles.title}>Register with AirSoft Elite</Text>

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

          <TouchableOpacity style={styles.customButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerLinkContainer}
            onPress={() => setIsRegisterMode(false)}
          >
            <Text style={styles.registerLink}>Return to Login</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    );
  }

  // LOGIN MODE
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Image
          style={styles.logo}
          source={require('../assets/logo.png')} 
          resizeMode="contain"
        />

        <Text style={styles.title}>AirSoft Elite</Text>

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

        <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLinkContainer}
          onPress={() => setIsRegisterMode(true)}
        >
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
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
    padding: 16,
    paddingBottom: 150,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 40,
    padding: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  customButton: {
    width: '80%',
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.desertLight,     
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLinkContainer: {
    position: 'absolute',
    bottom: 120,
    right: 50,
  },
  registerLink: {
    color: '#000',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
