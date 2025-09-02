import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

type Episode = {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  published: string;
};

const { width } = Dimensions.get('window');

const mockEpisodes: Episode[] = [
  {
    id: '1',
    title: 'Your First Visit: What to Expect',
    subtitle: 'With Dr. Emily Carter',
    duration: '24:18',
    published: 'Aug 21, 2025',
  },
  {
    id: '2',
    title: 'Nutrition Myths & Real Talk',
    subtitle: 'Featuring Sarah, RD',
    duration: '31:05',
    published: 'Aug 10, 2025',
  },
  {
    id: '3',
    title: 'Mindfulness for Tough Days',
    subtitle: 'Guided by Alex Nguyen',
    duration: '18:47',
    published: 'Jul 28, 2025',
  },
];

export default function PodcastScreen() {
  const [current, setCurrent] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlayEpisode = (ep: Episode) => {
    // UI-only: select episode and toggle playing
    setCurrent(ep);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  const renderEpisode = ({ item }: { item: Episode }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => onPlayEpisode(item)}>
      {/* Title row with a gradient chip on the left */}
      <View style={styles.row}>
        <LinearGradient
          colors={[Colors.claret, Colors.brightPink]}
          style={styles.badge}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="musical-notes-outline" size={16} color="#fff" />
        </LinearGradient>

        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          {!!item.subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
          )}
        </View>

        <TouchableOpacity onPress={() => onPlayEpisode(item)} style={styles.playBtn}>
          <Ionicons name="play" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Meta */}
      <View style={styles.metaRow}>
        <View style={styles.metaPill}>
          <Ionicons name="time-outline" size={14} color={Colors.body} />
          <Text style={styles.metaText}>{item.duration}</Text>
        </View>
        <View style={[styles.metaPill, { marginLeft: 10 }]}>
          <Ionicons name="calendar-outline" size={14} color={Colors.body} />
          <Text style={styles.metaText}>{item.published}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[Colors.bgSignUp[0], Colors.bgSignUp[1], Colors.bgSignUp[2]]}
      style={{ flex: 1 }}
    >
      <View style={styles.screen}>
        <Text style={styles.header}>Podcast</Text>

        <FlatList
          data={mockEpisodes}
          renderItem={renderEpisode}
          keyExtractor={(e) => e.id}
          contentContainerStyle={{ paddingBottom: current ? 120 : 24, paddingTop: 8 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          showsVerticalScrollIndicator={false}
        />

        {/* Mini Player (UI only) */}
        {current && (
          <View style={styles.playerWrap}>
            <View style={styles.playerCard}>
              <View style={styles.playerInfo}>
                <View style={styles.thumbnail}>
                  <LinearGradient
                    colors={[Colors.claret, Colors.brightPink]}
                    style={StyleSheet.absoluteFillObject as any}
                  />
                  <Ionicons name="mic-outline" size={20} color="#fff" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={styles.playerTitle}>{current.title}</Text>
                  <Text numberOfLines={1} style={styles.playerSub}>
                    {current.subtitle ?? 'SBC Podcast'}
                  </Text>
                </View>

                <TouchableOpacity onPress={togglePlay} style={styles.iconBtn}>
                  <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { /* next track (future) */ }} style={styles.iconBtn}>
                  <Ionicons name="play-skip-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Fake progress bar (UI only) */}
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const CARD_RADIUS = 16;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: { fontSize: 16, fontWeight: '700', color: Colors.heading },
  subtitle: { fontSize: 13, color: Colors.body, marginTop: 2 },
  playBtn: {
    marginLeft: 12,
    backgroundColor: Colors.claret,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaRow: { flexDirection: 'row', marginTop: 12 },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  metaText: { marginLeft: 6, color: Colors.body, fontSize: 12 },

  // mini-player
  playerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
    alignItems: 'center',
  },
  playerCard: {
    width: width * 0.92,
    borderRadius: CARD_RADIUS,
    backgroundColor: '#1f1f25',
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  playerInfo: { flexDirection: 'row', alignItems: 'center' },
  thumbnail: {
    width: 42,
    height: 42,
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerTitle: { color: '#fff', fontWeight: '700', fontSize: 14 },
  playerSub: { color: '#cfcfd6', fontSize: 12, marginTop: 2 },
  iconBtn: {
    marginLeft: 12,
    backgroundColor: Colors.brightPink,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#2c2c34',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    width: '30%', // fake 30% progress; replace when wired to audio
    height: '100%',
    backgroundColor: Colors.brightPink,
  },
});
