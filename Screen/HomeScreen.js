import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SettingScreen from './SettingScreen';
import WeatherMap from './WeatherMap';
import EventsScreen from './EventsScreen';
import EventDetailScreen from './EventDetailScreen';
import colors from '../src/color';
import ResetPasswordScreen from './ChangePasswordScreen';


function HomeScreenContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Events section
function EventsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.desertLight,
        },
        headerTintColor: colors.odgreenDark,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: "Back"
      }}
    >
      <Stack.Screen 
        name="EventsList" 
        component={EventsScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EventDetail" 
        component={EventDetailScreen}
        options={{ 
          headerTitle: '', 
        }}
      />
    </Stack.Navigator>
  );
  // How to create complex stack navigations learned from : https://reactnavigation.org/docs/stack-navigator/
}
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Return to Settings" 
        component={SettingScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ResetPassword" 
        component={ResetPasswordScreen} 
        options={{ 
          headerTitle: '',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
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
        <Tab.Screen name="Events" component={EventsStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
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
    backgroundColor: colors.odgreenLight,
  },
  text: {
    fontSize: 20,
    color: colors.desertLight,
  },
});