// SettingScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../src/firebaseConfig';  // adjust path as needed
import colors from '../src/color';                 // adjust or remove if not using


export default function SettingScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [playerType, setPlayerType] = useState('');

  // Fetch user info from Firestore and Auth
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        // Get email from Auth
        setEmail(currentUser.email || '');

        // Fetch Firestore doc at users/{uid}
        const userRef = doc(db, 'users', currentUser.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setUserName(data.name || '');
          setPlayerType(data.playerType || '');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // No extra navigation needed; App.js will detect user === null and show Login
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with title and Edit button */}
      <View style={styles.headerRow}>
        <Text style={styles.Title}>Personal Detail</Text>
        <TouchableOpacity 
          style={styles.editButtonContainer}
          onPress={() => navigation.navigate('ProfileScreen', { edit: true })}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* 1) User Name (non-clickable) */}
      <View style={styles.row}>
        <Text style={styles.label}>User Name</Text>
        <Text style={styles.value}>{userName}</Text>
      </View>

      {/* 2) Email (non-clickable) */}
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      {/* 3) Player Type (non-clickable) */}
      <View style={styles.row}>
        <Text style={styles.label}>Player Type</Text>
        <Text style={styles.value}>{playerType}</Text>
      </View>

      {/* 4) Change Password (clickable) */}
      <TouchableOpacity 
        style={styles.row}
        onPress={() => navigation.navigate('ResetPassword')}
      >
        <Text style={styles.label}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout Button at the bottom center */}
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
    backgroundColor: '#fff',
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
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});




