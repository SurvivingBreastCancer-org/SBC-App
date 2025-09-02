import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
    translateY.value = withTiming(0, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <LinearGradient
      colors={[Colors.claret, Colors.amaranthPurple, Colors.brightPink]}
      style={styles.container}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <Ionicons name="sparkles-outline" size={32} color={Colors.brightPink} />
        <Text style={styles.title}>Welcome Home</Text>
        <Text style={styles.subtitle}>
          Inspirational content coming soon ✨
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: width * 0.85,
    borderRadius: 20,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.heading,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.body,
    marginTop: 6,
    textAlign: 'center',
  },
});
