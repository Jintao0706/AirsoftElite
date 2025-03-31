// Password.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { updatePassword } from 'firebase/auth';
import { auth } from '../src/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../src/color';

export default function ChangePassword({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert('Success', 'Password updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Password update error:', error);
      Alert.alert('Error updating password', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Change Password</Text>

          <Text style={styles.label}>New Password:</Text>
          <TextInput
            placeholder="Enter new password"
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.label}>Confirm New Password:</Text>
          <TextInput
            placeholder="Confirm new password"
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
          <Text style={styles.saveButtonText}>Change Password</Text>
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
    padding: 16,
    justifyContent: 'center',
    paddingBottom: 120,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
    fontWeight: 'bold',
    color: colors.desertLight, 
  },
  label: {
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.desertLight,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    backgroundColor: colors.desertLight,
    borderRadius: 4,
  },
  saveButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    borderColor: colors.desertDark,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.desertDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: colors.odgreenDark,
    fontSize: 16,
    fontWeight: '600',
  },
});
