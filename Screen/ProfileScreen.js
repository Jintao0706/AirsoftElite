import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { auth } from '../src/firebaseConfig';
import { firebase_app } from '../src/firebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ onProfileComplete }) {
  const [name, setName] = useState('');
  // Instead of a single string, we use an array to allow multiple selections
  const [selectedPlayerTypes, setSelectedPlayerTypes] = useState([]);
  const db = getFirestore(firebase_app);

  const playerTypes = [
    { label: "Casual Players", value: "casual players", image: require('../assets/1.png') },
    { label: "Competitive Players", value: "competitive players", image: require('../assets/1.png') },
    { label: "Milsim Players", value: "milsim players", image: require('../assets/1.png') },
    { label: "CQB Players", value: "cqb players", image: require('../assets/1.png') },
    { label: "Sniper", value: "sniper", image: require('../assets/1.png') },
    { label: "Strategy Player", value: "strategy player", image: require('../assets/1.png') },
  ];

  // Toggle selection: add if not selected, remove if already selected
  const handleTogglePlayerType = (value) => {
    if (selectedPlayerTypes.includes(value)) {
      setSelectedPlayerTypes(selectedPlayerTypes.filter(item => item !== value));
    } else {
      setSelectedPlayerTypes([...selectedPlayerTypes, value]);
    }
  };

  const handleSaveProfile = async () => {
    if (!name) {
      Alert.alert('Please enter your name');
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('User not authenticated');
      return;
    }
    try {
      // Save structured data to Firestore; store selectedPlayerTypes as an array
      await setDoc(doc(db, 'users', user.uid), {
        name,
        playerTypes: selectedPlayerTypes,
      });
      Alert.alert('Profile Saved', 'Your profile has been saved successfully.', [
        { text: 'OK', onPress: onProfileComplete },
      ]);
    } catch (error) {
      Alert.alert('Error saving profile', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Main container separates top content and bottom button */}
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.label}>Enter Your User Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Select Your Player Type:</Text>
          <View style={styles.gridContainer}>
            {playerTypes.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.gridItem,
                  selectedPlayerTypes.includes(item.value) && styles.selectedGridItem,
                ]}
                onPress={() => handleTogglePlayerType(item.value)}
              >
                <Image source={item.image} style={styles.gridImage} resizeMode="contain" />
                <Text style={styles.gridLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Button title="Save Profile" onPress={handleSaveProfile} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  gridContainer: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%', // roughly 3 items per row
    alignItems: 'center',
    marginBottom: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
  },
  selectedGridItem: {
    borderColor: 'blue', // highlight selected item
  },
  gridImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  gridLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});






