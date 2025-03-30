import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SettingScreen from './SettingScreen';
import EventsScreen from './EventsScreen';
import EventDetailScreen from './EventDetailScreen';
import colors from '../src/color';
import ResetPasswordScreen from './ChangePasswordScreen';
import ProfileScreen from './ProfileScreen';

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
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.odgreenLight, 
        },
        headerTintColor: colors.desertLight,    
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="SettingScreen"  //RETURN
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: '', 
        }}
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
            if (route.name === 'Events') {
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
        <Tab.Screen name="Events" component={EventsStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  // How to customize navigation bar learned from : https://reactnavigation.org/docs/customizing-tabbar
}

