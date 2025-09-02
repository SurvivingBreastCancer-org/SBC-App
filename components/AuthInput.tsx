import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

type Props = TextInputProps & {
  icon?: React.ComponentProps<typeof Feather>['name'];
  secureToggle?: boolean;
};

export default function AuthInput({ icon = 'mail', secureTextEntry, secureToggle, style, ...rest }: Props) {
  const [show, setShow] = useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <View style={styles.wrap}>
      <Feather name={icon} size={20} color={Colors.placeholder} style={styles.leftIcon} />
      <TextInput
        {...rest}
        placeholderTextColor={Colors.placeholder}
        secureTextEntry={isPassword && !show}
        style={[styles.input, style]}
      />
      {secureToggle && (
        <TouchableOpacity onPress={() => setShow(!show)} style={styles.rightIcon} hitSlop={12}>
          <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={22} color={Colors.placeholder} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative', marginBottom: 14 },
  input: {
    height: 54,
    borderRadius: 16,
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    color: Colors.heading,
    fontSize: 16,
  },
  leftIcon: { position: 'absolute', left: 16, top: 17 },
  rightIcon: { position: 'absolute', right: 14, top: 16 },
});
