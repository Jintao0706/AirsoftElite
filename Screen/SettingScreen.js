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
import colors from '../src/color';                 // remove/adjust if not using color.js

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
          // Adjust field names if your Firestore doc is different
          setUserName(data.name || '');
          setPlayerType(data.playerType || '');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // TODO: Implement your logout logic
    // e.g., auth.signOut().then(() => navigation.replace('Login'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Personal Detail</Text>

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
        <Text style={styles.label}>Reset Password</Text>
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
    backgroundColor: colors.odgreenLight, // or any background color you prefer
    padding: 16,
  },
  Title: {
    fontSize: 18,
    color: colors.desertLight,
    marginBottom: 12,
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



