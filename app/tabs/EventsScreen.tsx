import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
};

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Breast Cancer Awareness Webinar',
    date: 'Sep 15, 2025 • 6:00 PM',
    location: 'Online (Zoom)',
  },
  {
    id: '2',
    title: 'Community Support Group',
    date: 'Sep 22, 2025 • 5:30 PM',
    location: 'Wellness Center, Boston',
  },
  {
    id: '3',
    title: 'Fundraising Gala',
    date: 'Oct 5, 2025 • 7:00 PM',
    location: 'Hilton Hotel, NYC',
  },
];

export default function EventsScreen() {
  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <LinearGradient
        colors={[Colors.claret, Colors.brightPink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.cardHeader}
      >
        <Ionicons name="calendar-outline" size={20} color="#fff" />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </LinearGradient>
      <View style={styles.cardBody}>
        <Text style={styles.cardText}>{item.date}</Text>
        <Text style={styles.cardText}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[Colors.bgSignUp[0], Colors.bgSignUp[1], Colors.bgSignUp[2]]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Upcoming Events</Text>
        <FlatList
          data={mockEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          contentContainerStyle={{ paddingVertical: 16 }}
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
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
    flexShrink: 1,
  },
  cardBody: { padding: 12 },
  cardText: { fontSize: 14, color: Colors.body, marginBottom: 4 },
});
