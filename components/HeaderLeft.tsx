import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export default function HeaderLeft() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ paddingHorizontal: 12 }}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <Ionicons name="menu" size={22} />
    </TouchableOpacity>
  );
}
