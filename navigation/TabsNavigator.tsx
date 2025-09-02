import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../app/tabs/HomeScreen';
import EventsScreen from '../app/tabs/EventsScreen';
import AskSBCScreen from '../app/tabs/AskSBCScreen';
import PodcastScreen from '../app/tabs/PodcastScreen';
import InboxScreen from '../app/tabs/InboxScreen';

import HeaderLeft from '../components/HeaderLeft';
import HeaderRight from '../components/HeaderRight';
import { Colors } from '../theme/colors';

export type TabsParamList = {
  Home: undefined;
  Events: undefined;
  AskSBC: undefined;
  Podcast: undefined;
  Inbox: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,

        // ✅ white header
        headerBackground: () => <View style={StyleSheet.absoluteFill} />,
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { color: Colors.heading, fontWeight: '800' },
        headerTintColor: Colors.heading,

        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight />,

        tabBarIcon: ({ focused, color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = 'home-outline';
          if (route.name === 'Home') icon = focused ? 'home' : 'home-outline';
          else if (route.name === 'Events') icon = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'AskSBC') icon = focused ? 'chatbubble' : 'chatbubble-outline';
          else if (route.name === 'Podcast') icon = focused ? 'mic' : 'mic-outline';
          else if (route.name === 'Inbox') icon = focused ? 'mail' : 'mail-outline';
          return <Ionicons name={icon} size={size} color={color} />;
        },

        // ✅ white tab bar
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: 'rgba(0,0,0,0.06)',
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: Colors.claret,
        tabBarInactiveTintColor: '#9AA4B2',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Events" component={EventsScreen} options={{ title: 'Events' }} />
      <Tab.Screen name="AskSBC" component={AskSBCScreen} options={{ title: 'Ask SBC' }} />
      <Tab.Screen name="Podcast" component={PodcastScreen} options={{ title: 'Podcast' }} />
      <Tab.Screen name="Inbox" component={InboxScreen} options={{ title: 'Inbox' }} />
    </Tab.Navigator>
  );
}