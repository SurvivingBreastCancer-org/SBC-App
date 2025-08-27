import React from 'react';
import { View, Text } from 'react-native';

export default function TrendingScreen() {
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:18, marginBottom:8 }}>Trending</Text>
      <Text>Users can comment under trending posts (placeholder)</Text>
    </View>
  );
}
