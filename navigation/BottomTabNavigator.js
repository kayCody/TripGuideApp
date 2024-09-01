import { View, Text } from 'react-native'
import { Image } from 'react-native'
import React, { useState } from 'react'
import { TripsScreen, TripDetailScreen, DestinationScreen, DestinationDetailScreen, DestinationAvailabilityScreen,DestinationPaymentScreen, NotificationScreen, NotificationDetailScreen, EmergencyScreen, NavigationScreen, LanguageTranslatorScreen, AccountScreen, ProfileScreen } from '../screens';

import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

//instantiateBottom Navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//creating variables
const Trips = "Trips";
const Notification = "Notification";
const Emergency = "Emergency";
const Language = "Language Translator";
const Account = "Account";

function NotificationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="alert" component={NotificationScreen} />
      <Stack.Screen options={{ headerShown: false }} name="alert-detail" component={NotificationDetailScreen} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="account-screen" component={AccountScreen} />
      <Stack.Screen options={{ headerShown: false }} name="profile-info" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
function TripStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="trip-screen" component={TripsScreen} />
      <Stack.Screen options={{ headerShown: false }} name="details" component={TripDetailScreen} />
      <Stack.Screen options={{ headerShown: false }} name="destination" component={DestinationScreen} />
      <Stack.Screen options={{ headerShown: false }} name="destination-detail" component={DestinationDetailScreen} />
      <Stack.Screen options={{ headerShown: false }} name="destination-availability" component={DestinationAvailabilityScreen} />
      <Stack.Screen options={{ headerShown: false }} name="payment" component={DestinationPaymentScreen} />
      <Stack.Screen options={{ headerShown: false }} name="navigation" component={NavigationScreen} />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigator({navigation}) {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isNotification, setIsNotification] = useState(false);
  return (
    <Tab.Navigator
      initialRouteName={Trips}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#0a4983',
        headerShown: false,
        tabBarIcon: ({ focused, size, color }) => {
          let IconName;
          let routName = route.name;
          if (routName === Trips) {
            IconName = focused ? 'bag-sharp' : 'bag-outline';
          } else if (routName === Notification) {
            IconName = focused ? 'notifications-sharp' : 'notifications-outline';
            // Render the icon with a badge
            return (
              <View style={{ width: 24, height: 24 }}>
                <Ionicons name={IconName} size={size} color={color} />
                {isNotification &&
                  <View
                    style={{
                      position: 'absolute',
                      right: -6,
                      top: -3,
                      backgroundColor: 'red',
                      borderRadius: 8,
                      width: 16,
                      height: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      0
                    </Text>
                  </View>
                }
              </View>
            );
          } else if (routName === Emergency) {
            IconName = focused ? 'help-buoy-sharp' : 'help-buoy-outline';
          } else if (routName === Language) {
            IconName = focused ? 'language-sharp' : 'language-outline';
          } else if (routName === Account) {
            IconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
          }
          return <Ionicons name={IconName} size={25} color={color} />
        },
      })}
    >
      <Tab.Screen name={Trips} component={TripStack} />
      <Tab.Screen name={Notification} component={NotificationStack} />
      <Tab.Screen name={Emergency} component={EmergencyScreen} />
      <Tab.Screen name={Language} component={LanguageTranslatorScreen} />
      <Tab.Screen name={Account} component={AccountStack} />
    </Tab.Navigator>
  )
}

