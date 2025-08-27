import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderRight() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={{ paddingHorizontal: 12 }} onPress={() => { /* TODO: Notifications */ }}>
        <Ionicons name="notifications-outline" size={22} />
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingRight: 12 }} onPress={() => { /* TODO: Donate */ }}>
        <Ionicons name="heart-outline" size={22} />
      </TouchableOpacity>
    </View>
  );
}
