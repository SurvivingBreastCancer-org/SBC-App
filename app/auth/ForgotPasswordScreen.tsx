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

export default function ForgotPasswordScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>) {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={[styles.logo, { backgroundColor: Colors.brightPink }]}>
            <Ionicons name="lock-closed-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>Reset Password</Text>
          <Text style={styles.sub}>
            Don't worry! Enter your email address and we'll send you instructions to reset your password.
          </Text>
        </View>

        <View style={{ width: '100%', maxWidth: 420 }}>
          <AuthInput
            icon="mail"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
          />
          <PrimaryButton title="Send Reset Link" onPress={() => requestPasswordReset(email)} />

          <View style={{ alignItems: 'center', marginTop: 18 }}>
            <Text style={{ color: Colors.body, marginBottom: 6 }}>Remember your password?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={{ color: Colors.brightPink, fontWeight: '700' }}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center', justifyContent: 'center', flexGrow: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 18, paddingHorizontal: 12 },
  logo: { width: 76, height: 76, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.heading, marginTop: 10 },
  sub: { color: Colors.body, textAlign: 'center', marginTop: 6, lineHeight: 20 },
});
