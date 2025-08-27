// navigation/TabsNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// screens
import HomeScreen from '../app/HomeScreen';
import EventsScreen from '../app/EventsScreen';
import AskSBCScreen from '../app/AskSBCScreen';
import PodcastScreen from '../app/PodcastScreen';
import InboxScreen from '../app/InboxScreen';

// header buttons
import HeaderLeft from '../components/HeaderLeft';
import HeaderRight from '../components/HeaderRight';

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
        // 👇 show hamburger + bell/heart on every tab screen
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight />,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Events') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'AskSBC') iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          else if (route.name === 'Podcast') iconName = focused ? 'mic' : 'mic-outline';
          else if (route.name === 'Inbox') iconName = focused ? 'mail' : 'mail-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
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
