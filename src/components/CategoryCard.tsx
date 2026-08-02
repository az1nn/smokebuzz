import React, { useCallback, useRef } from "react";
import { View, Text, Animated, Platform, Easing } from "react-native";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const LINE = "rgba(201,162,75,0.28)";
const BRASS = "#c9a24b";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function CategoryCard({ icon, title, description }: Props) {
  const lift = useRef(new Animated.Value(0)).current;
  const border = useRef(new Animated.Value(0)).current;
  const nativeDriver = Platform.OS !== "web";
  const reducedMotion = usePrefersReducedMotion();

  const translateY = lift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  const borderColor = border.interpolate({
    inputRange: [0, 1],
    outputRange: [LINE, BRASS],
  });

  const animate = useCallback(
    (toValue: number) => {
      if (reducedMotion) {
        border.setValue(toValue);
        return;
      }
      Animated.timing(lift, {
        toValue,
        duration: 250,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        useNativeDriver: nativeDriver,
      }).start();
      Animated.timing(border, {
        toValue,
        duration: 250,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        useNativeDriver: false,
      }).start();
    },
    [lift, border, nativeDriver, reducedMotion]
  );

  return (
    <Animated.View style={reducedMotion ? undefined : { transform: [{ translateY }] }}>
      <Animated.View
        className="bg-gradient-to-b from-espresso to-espresso-2 border rounded-lg p-[34px_28px]"
        style={{ borderColor }}
        {...({ onMouseEnter: () => animate(1), onMouseLeave: () => animate(0) } as any)}
      >
        <View className="mb-5">{icon}</View>
        <Text className="text-brass-light font-rye text-xl mb-[10px]">
          {title}
        </Text>
        <Text className="text-cream-dim font-jost text-[14.72px] leading-[1.55] font-light">
          {description}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
