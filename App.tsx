import 'react-native-gesture-handler'; 

import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import RootNavigator from './navigation/RootNavigator';


const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',   
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="auto" />
        {/* RootNavigator contains the Drawer, which wraps your TabsNavigator */}
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
