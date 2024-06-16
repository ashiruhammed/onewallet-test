import color from 'color';
import Paginator from 'components/Paginator';
import ConnectedWorld from 'components/icon/ConnectedWorld';
import FreeLancer from 'components/icon/FreeLancer';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const screenObj = [
  {
    img: FreeLancer,
    title: 'OneWallet for all\n your financial needs',
    description: '',
    id: 1,
  },
  {
    img: ConnectedWorld,
    title: 'Recienve Payment with\n with your QRCODE',
    description: '',
    id: 2,
  },
  {
    img: ConnectedWorld,
    title: 'Shop Conviniently\n with OneWallet',
    description: '',
    id: 3,
  },
  {
    img: ConnectedWorld,
    title: 'Get Paid by\n Everyone, Pay anyone',
    description: '',
    id: 4,
  },
];

const Intro = () => {
  const scrollX = useSharedValue(0);
  const scrollIndex = useSharedValue(0);
  const slideRef: any = useAnimatedRef();
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= screenObj.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);

      slideRef.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, width]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
      <View style={styles.container}>
        <Animated.FlatList
          data={screenObj}
          contentContainerStyle={{
            alignSelf: 'flex-start',
          }}
          onScroll={onScroll}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          onViewableItemsChanged={(viewableItems: any) => {
            if (viewableItems[0]) {
              scrollIndex.value = viewableItems[0].index;
            }
          }}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          ref={slideRef}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          bounces={false}
          renderItem={({ item, index }) => (
            <IntroSlider
              Img={item.img}
              scrollX={scrollX}
              index={index}
              title={item.title}
              description={item.description}
            />
          )}
        />

        <Paginator data={screenObj} scrollX={scrollX} />
      </View>
    </View>
  );
};

function IntroSlider({
  Img,
  title,
  description,
  index,
  scrollX,
}: {
  Img: React.ElementType;
  title: string;
  description: string;
  imageAnimation?: any;
  index: number;
  scrollX: Animated.SharedValue<number>;
}) {
  const { width } = useWindowDimensions();
  const imageAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });
  return (
    <View style={[{ width }]}>
      <Animated.View style={[imageAnimation, { alignItems: 'center' }]}>
        <Img />
      </Animated.View>
      <View style={{ marginTop: 36, gap: 8, paddingHorizontal: 12 }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: '600',
            color: color.gray,
          }}>
          {title}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            lineHeight: 24,
            color: color.gray,
            fontWeight: '300',
          }}>
          {description}
        </Text>
      </View>
    </View>
  );
}

export default Intro;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'white',
  },
});
