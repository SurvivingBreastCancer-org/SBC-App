import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';

type Post = {
  id: string;
  author: string;
  title: string;
  excerpt: string;
  likes: number;
  comments: number;
};

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Sarah T.',
    title: 'My recovery journey',
    excerpt: 'It’s been a tough year, but with community support I feel stronger every day...',
    likes: 42,
    comments: 9,
  },
  {
    id: '2',
    author: 'Dr. Emily',
    title: '5 Nutrition Tips',
    excerpt: 'Balanced meals, hydration, and mindful eating can improve your daily energy...',
    likes: 31,
    comments: 5,
  },
  {
    id: '3',
    author: 'Community Post',
    title: 'Upcoming Fundraiser!',
    excerpt: 'Join us in October for the annual SBC fundraising gala in NYC...',
    likes: 19,
    comments: 3,
  },
];

export default function TrendingScreen() {
  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Ionicons name="person-circle-outline" size={32} color={Colors.claret} />
        <Text style={styles.author}>{item.author}</Text>
      </View>

      {/* Body */}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.excerpt} numberOfLines={2}>{item.excerpt}</Text>

      {/* Footer actions */}
      <View style={styles.footer}>
        <View style={styles.action}>
          <Ionicons name="heart-outline" size={18} color={Colors.claret} />
          <Text style={styles.actionText}>{item.likes}</Text>
        </View>
        <View style={styles.action}>
          <Ionicons name="chatbubble-outline" size={18} color={Colors.claret} />
          <Text style={styles.actionText}>{item.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[Colors.bgForgot[0], Colors.bgForgot[1], Colors.bgForgot[2]]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>🔥 Trending</Text>
        <FlatList
          data={mockPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerStyle={{ paddingVertical: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  author: { marginLeft: 8, fontSize: 14, fontWeight: '600', color: Colors.heading },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4, color: Colors.heading },
  excerpt: { fontSize: 14, color: Colors.body, marginBottom: 10 },
  footer: { flexDirection: 'row' },
  action: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  actionText: { marginLeft: 4, color: Colors.body, fontSize: 13 },
});
