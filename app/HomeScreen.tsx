import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

export default function HomeScreen() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) });
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:16 }}>
      <Animated.View style={style}>
        <Text style={{ fontSize:18, fontWeight:'600', textAlign:'center' }}>
          Home — inspirational content coming soon
        </Text>
      </Animated.View>
    </View>
  );
}
