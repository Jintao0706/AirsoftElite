import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../src/firebaseConfig';  // adjust path as needed
import colors from '../src/color';                 // adjust or remove if not using

export default function SettingScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [playerTypes, setPlayerTypes] = useState(''); 

  // Define a function to fetch user data from Firestore and Auth.
  const fetchUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      setEmail(currentUser.email || '');
      
      const userRef = doc(db, 'users', currentUser.uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setUserName(data.name || '');
        // If playerTypes is an array, join it into a string.
        setPlayerTypes(
          data.playerTypes && Array.isArray(data.playerTypes)
            ? data.playerTypes.join(', ')
            : ''
        );
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  // Use useFocusEffect to refresh data when the screen gains focus.
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.Title}>Personal Detail</Text>
        <TouchableOpacity 
          style={styles.editButtonContainer}
          onPress={() => navigation.navigate('ProfileScreen', { edit: true })}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>User Name</Text>
        <Text style={styles.value}>{userName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Player Type</Text>
        <Text style={styles.value}>{playerTypes}</Text>
      </View>

      <TouchableOpacity 
        style={styles.row}
        onPress={() => navigation.navigate('ResetPassword')}
      >
        <Text style={styles.label}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.odgreenLight,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  Title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.desertLight,
  },
  editButtonContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.desertLight,
    borderRadius: 4,
  },
  editButtonText: {
    color: colors.odgreenDark,
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.desertLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: colors.desertDark,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});





