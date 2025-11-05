import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  View,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

interface CarouselProps {
  images: any[];
  height?: number;
  autoScroll?: boolean;
  scrollInterval?: number;
  dotColorActive?: string;
  dotColorInactive?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  height = 200,
  autoScroll = true,
  scrollInterval = 3000,
  dotColorActive = "#2ECC71",
  dotColorInactive = "#E0E0E0",
}) => {
  const { width: screenWidth } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef<FlatList>(null);

  // Auto scroll
  useEffect(() => {
    if (!autoScroll || images.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      flatlistRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [activeIndex, autoScroll, images.length, scrollInterval]);

  // Handle scroll
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / screenWidth);
    setActiveIndex(index);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ width: screenWidth }}>
      <Image
        source={typeof item === "string" ? { uri: item } : item}
        style={{
          width: screenWidth,
          height,
          resizeMode: "cover",
        }}
      />
    </View>
  );

  return (
    <View className="relative">
      <FlatList
        ref={flatlistRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        scrollEventThrottle={16}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        bounces={false}
      />

      <View className="absolute bottom-0 left-0 right-0 flex-row justify-center mb-4">
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeIndex === index ? dotColorActive : dotColorInactive,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
