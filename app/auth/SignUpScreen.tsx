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

export default function SignUpScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, 'SignUp'>) {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');

  const onSubmit = async () => {
    if (!email || !password || password !== confirm) return;
    await signUp(email, password);
    navigation.replace('ConfirmEmail', { email });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Title */}
        <View style={{ width: '100%', maxWidth: 420, flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {/* no back chevron since header hidden; optional add a tiny link */}
        </View>

        <View style={styles.header}>
          <View style={[styles.logo, { backgroundColor: Colors.claret }]}>
            <Ionicons name="person-outline" size={30} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={{ color: Colors.body, marginTop: 4 }}>Join us today</Text>
        </View>

        <View style={{ width: '100%', maxWidth: 420 }}>
          <AuthInput icon="user" placeholder="Full Name" value={fullName} onChangeText={setFullName} />
          <AuthInput icon="mail" keyboardType="email-address" autoCapitalize="none"
            placeholder="Email address" value={email} onChangeText={setEmail} />
          <AuthInput icon="smartphone" keyboardType="phone-pad" placeholder="Phone number"
            value={phone} onChangeText={setPhone} />
          <AuthInput icon="lock" placeholder="Password" autoCapitalize="none"
            secureTextEntry secureToggle value={password} onChangeText={setPassword} />
          <AuthInput icon="lock" placeholder="Confirm Password" autoCapitalize="none"
            secureTextEntry secureToggle value={confirm} onChangeText={setConfirm} />

          <PrimaryButton title="Create Account" onPress={onSubmit} />
          <Text style={styles.tos}>
            By signing up, you agree to our <Text style={styles.tosLink}>Terms of Service</Text> and <Text style={styles.tosLink}>Privacy Policy</Text>
          </Text>
        </View>

        <View style={{ marginTop: 18, flexDirection: 'row' }}>
          <Text style={{ color: Colors.body }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{ color: Colors.brightPink, fontWeight: '700' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center', justifyContent: 'center', flexGrow: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 16 },
  logo: { width: 64, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.heading, marginTop: 10 },
  tos: { textAlign: 'center', color: Colors.body, fontSize: 12, marginTop: 10 },
  tosLink: { color: Colors.brightPink, textDecorationLine: 'underline' },
});
