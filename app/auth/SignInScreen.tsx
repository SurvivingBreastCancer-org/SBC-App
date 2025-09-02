import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AuthInput from '../../components/AuthInput';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../auth/AuthProvider';
import { Colors } from '../../theme/colors';

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ConfirmEmail: { email: string };
  ForgotPassword: undefined;
};

export default function SignInScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, 'SignIn'>) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Logo / Heading */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="person-outline" size={34} color="#fff" />
          </View>
          <Text style={styles.title}>Welcome to SBC</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        {/* Form */}
        <View style={{ width: '100%', maxWidth: 420 }}>
          <AuthInput
            icon="mail"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            icon="lock"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            secureToggle
            value={password}
            onChangeText={setPassword}
          />

          <View style={{ alignItems: 'flex-end', marginBottom: 16 }}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={[styles.link, { color: Colors.brightPink }]}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton title="Sign In" onPress={() => signIn(email, password)} />
        </View>

        {/* Footer link */}
        <View style={{ marginTop: 22, flexDirection: 'row' }}>
          <Text style={{ color: Colors.body }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.link, { color: Colors.brightPink }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center', justifyContent: 'center', flexGrow: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 18 },
  logo: {
    width: 76, height: 76, borderRadius: 24,
    backgroundColor: Colors.amaranthPurple,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 28, fontWeight: '800', color: Colors.heading, marginTop: 14 },
  subtitle: { color: Colors.body, marginTop: 4 },
  link: { fontWeight: '700' },
});