import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../src/firebaseConfig';
import colors from '../src/color';

export default function SettingScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [playerTypes, setPlayerTypes] = useState(''); 

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
        <Text style={styles.title}>Personal Detail</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('ProfileScreen', { edit: true })}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>User Name</Text>
        <Text style={styles.value}>{userName}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Player Type</Text>
        <Text style={styles.value}>{playerTypes}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.detailBox, styles.touchableBox]}
        onPress={() => navigation.navigate('ResetPassword')}
      >
        <Text style={styles.label}>Change Password</Text>
        <Text style={styles.arrow}>{'>'}</Text>
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
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.desertLight,
  },
  editButton: {
    backgroundColor: colors.desertLight,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  editButtonText: {
    color: colors.odgreenDark,
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailBox: {
    backgroundColor: colors.desertLight,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#555',
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 10,
  },
  arrow: {
    fontSize: 18,
    color: '#000',
  },
  touchableBox: {
    paddingVertical: 16,
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: colors.desertDark,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


