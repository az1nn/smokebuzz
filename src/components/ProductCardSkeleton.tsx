import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Platform } from "react-native";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const BAR_WIDTH = 90;
const BAR_COLOR = "#c9a24b";
const BAR_OPACITY = 0.4;

export default function ProductCardSkeleton() {
  const shimmer = useRef(new Animated.Value(0)).current;
  const reducedMotion = usePrefersReducedMotion();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (reducedMotion || width <= 0) return;
    const loop = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: Platform.OS !== "web",
      })
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer, reducedMotion, width]);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-BAR_WIDTH, width],
  });

  return (
    <View
      className="bg-noir border border-line rounded-lg overflow-hidden flex-1 min-w-[140px]"
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View className="bg-white aspect-square p-[18px]" />
      <View className="p-5 pb-6">
        <View className="bg-line rounded h-[16px] mb-2 w-4/5" />
        <View className="bg-espresso rounded h-[18px] w-1/3" />
      </View>
      {!reducedMotion && (
        <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: BAR_WIDTH,
              backgroundColor: BAR_COLOR,
              opacity: BAR_OPACITY,
              transform: [{ translateX }],
            }}
          />
        </View>
      )}
    </View>
  );
}
