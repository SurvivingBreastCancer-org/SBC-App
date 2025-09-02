import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
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

export default function ConfirmEmailScreen({ route, navigation }: NativeStackScreenProps<AuthStackParamList, 'ConfirmEmail'>) {
  const email = route.params?.email ?? '';
  const { confirmSignUp } = useAuth();
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Confirm Email</Text>
          <Text style={styles.sub}>Enter the 6-digit code sent to</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={{ width: '100%', maxWidth: 420 }}>
          <AuthInput icon="hash" keyboardType="number-pad" placeholder="Confirmation code" value={code} onChangeText={setCode} />
          <PrimaryButton title="Confirm" onPress={() => confirmSignUp(email, code)} />
          <View style={{ marginTop: 14, alignItems: 'center' }}>
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
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.heading },
  sub: { color: Colors.body, marginTop: 10 },
  email: { color: Colors.heading, fontWeight: '700', marginTop: 4 },
});
