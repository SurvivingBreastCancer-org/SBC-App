// navigation/RootNavigator.tsx
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import TabsNavigator from './TabsNavigator';
import ProfileScreen from '../app/ProfileScreen';
import TrendingScreen from '../app/TrendingScreen';

export type RootDrawerParamList = {
  Tabs: undefined;
  Profile: undefined;
  Trending: undefined;
  // Admin?: undefined; // enable later if you add an Admin screen
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: false, // ✅ hide drawer header (removes "Hi Nghia")
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
          {/* built-in list of declared Drawer.Screen items */}
          <DrawerItemList {...props} />

          {/* extra placeholder item */}
          <DrawerItem
            label="More features… (coming soon)"
            onPress={() => {}}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ title: 'App' }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Drawer.Screen
        name="Trending"
        component={TrendingScreen}
        options={{ title: 'Trending' }}
      />
      {/* <Drawer.Screen name="Admin" component={AdminDashboardScreen} /> */}
    </Drawer.Navigator>
  );
}
