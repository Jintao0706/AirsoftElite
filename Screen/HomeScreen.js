import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import WeatherMap from './WeatherMap';
import EventsScreen from './EventsScreen';
import colors from '../src/color'

function HomeScreenContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

// Main component with navigation setup
export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.desertLight,
          },
          headerStyle: {
            backgroundColor: colors.desertLight,
          },
          headerTintColor: colors.odgreenDark,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Weather') {
              iconName = focused ? 'cloud' : 'cloud-outline';
            } else if (route.name === 'Events') {
              iconName = focused ? 'footsteps' : 'footsteps-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
          // For more icons needed: https://ionic.io/ionicons
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.odgreen,
          tabBarInactiveTintColor: colors.odgreenLight,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreenContent} />
        <Tab.Screen name="Weather" component={WeatherMap} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  // How to customize navigation bar learned from : https://reactnavigation.org/docs/customizing-tabbar
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});