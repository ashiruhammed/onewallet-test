import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';

import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import color from 'color';

const Paginator = ({ data, scrollX }: { data: any; scrollX: Animated.SharedValue<number> }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {[...data].map((_: any, index: number) => {
        const dotWidth = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [10, 35, 10],
            Extrapolation.CLAMP
          );
          const opacity = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.5, 1, 0.5],
            Extrapolation.CLAMP
          );

          return {
            width: withTiming(dotWidth, {
              easing: Easing.inOut(Easing.quad),
              duration: 30,
            }),
            opacity,
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              {
                height: 8,
                backgroundColor: color.primary,
                margin: 5,
                borderRadius: 10,
                // opacity: opacity,
              },
              dotWidth,
            ]}>
            <Animated.View style={[dotWidth]} />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
