import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Platform, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TabsNavigator from './TabsNavigator';

// screens
import ProfileScreen from '../app/profile/ProfileScreen';
import TrendingScreen from '../app/tabs/TrendingScreen';

// auth
import SignInScreen from '../app/auth/SignInScreen';
import SignUpScreen from '../app/auth/SignUpScreen';
import ConfirmEmailScreen from '../app/auth/ConfirmEmailScreen';
import ForgotPasswordScreen from '../app/auth/ForgotPasswordScreen';

import { useAuth } from '../auth/AuthProvider';

// Types
export type RootDrawerParamList = {
  Tabs: undefined;
  Profile: undefined;
  Trending: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ConfirmEmail: { email: string };
  ForgotPassword: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const AppStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56; // top header height from Tabs
const TAB_BAR_HEIGHT = 62; // matches TabsNavigator tabBarStyle.height

export default function RootNavigator() {
  const { loading, isSignedIn } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // unauth → auth flow (no headers)
  if (!isSignedIn) {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </AuthStack.Navigator>
    );
  }

  // signed in → app
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="AppDrawer" component={AppDrawer} />
    </AppStack.Navigator>
  );
}

function AppDrawer() {
  const insets = useSafeAreaInsets();
  const { height: WINDOW_HEIGHT } = Dimensions.get('window');

  // drawer
  const topOffset = HEADER_HEIGHT + insets.top;
  const bottomOffset = TAB_BAR_HEIGHT + insets.bottom;
  const drawerHeight = Math.max(0, WINDOW_HEIGHT - topOffset - bottomOffset);

  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: false,
        drawerType: 'front',

        //  core styling: drawer slides 
        drawerStyle: {
          marginTop: topOffset,
          height: drawerHeight,
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          overflow: 'hidden',
          width: '82%',
        },
        overlayColor: 'rgba(0,0,0,0.15)',
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          <DrawerItemList {...props} />
          <DrawerItem label="More features… (coming soon)" onPress={() => {}} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="Tabs" component={TabsNavigator} options={{ title: 'App' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Drawer.Screen name="Trending" component={TrendingScreen} options={{ title: 'Trending' }} />
    </Drawer.Navigator>
  );
}
