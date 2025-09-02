import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';

type Message = {
  id: string;
  sender: string;
  preview: string;
  time: string;
  unread?: boolean;
};

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'SBC Support',
    preview: 'Welcome to the community! We’re here to support you 💕',
    time: '2h ago',
    unread: true,
  },
  {
    id: '2',
    sender: 'Dr. Emily',
    preview: 'Your test results look good. Let’s schedule a follow-up.',
    time: 'Yesterday',
  },
  {
    id: '3',
    sender: 'Community Member',
    preview: 'Thank you for sharing your story in the forum!',
    time: '2d ago',
  },
];

export default function InboxScreen() {
  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle-outline" size={40} color={Colors.claret} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.sender, item.unread && { color: Colors.claret }]}>
            {item.sender}
          </Text>
          <Text
            style={[styles.preview, item.unread && { fontWeight: '600', color: Colors.heading }]}
            numberOfLines={1}
          >
            {item.preview}
          </Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[Colors.bgSignIn[0], Colors.bgSignIn[1], Colors.bgSignIn[2]]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Inbox</Text>
        <FlatList
          data={mockMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 8 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { marginRight: 12 },
  sender: { fontSize: 16, fontWeight: '600', color: Colors.heading },
  preview: { fontSize: 14, color: Colors.body, marginTop: 2 },
  time: { fontSize: 12, color: Colors.placeholder, marginLeft: 8 },
});
