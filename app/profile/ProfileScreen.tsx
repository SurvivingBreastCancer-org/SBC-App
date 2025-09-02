import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../auth/AuthProvider';
import { Colors } from '../../theme/colors';
import GradientButton from '../../components/GradientButton';

export default function ProfileScreen() {
  const { email, signOut } = useAuth();

  return (
    <LinearGradient colors={[Colors.claret, Colors.amaranthPurple, Colors.brightPink]} style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <Ionicons name="person-circle-outline" size={96} color="#fff" />
        </View>

        {/* User Info */}
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.email}>{email ?? 'Unknown user'}</Text>

        {/* Placeholder for future edit */}
        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="create-outline" size={18} color={Colors.brightPink} />
          <Text style={styles.editText}>Edit Profile (coming soon)</Text>
        </TouchableOpacity>

        {/* Spacer */}
        <View style={{ height: 40 }} />

        {/* Sign out button */}
        <GradientButton
          title="Sign Out"
          onPress={signOut}
          colors={[Colors.brightPink, Colors.claret]}
          style={{ width: '100%', maxWidth: 320 }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  avatarWrap: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  title: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 4 },
  email: { fontSize: 16, color: '#FCE7F3', marginBottom: 12 },
  editBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  editText: { color: Colors.brightPink, marginLeft: 6, fontWeight: '600' },
});
