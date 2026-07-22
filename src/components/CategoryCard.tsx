import React, { useState } from "react";
import { View, Text, Animated } from "react-native";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function CategoryCard({ icon, title, description }: Props) {
  const [hovered, setHovered] = useState(false);
  return (
    <Animated.View style={{ transform: [{ translateY: hovered ? -6 : 0 }] }}>
      <View
        className={`bg-gradient-to-b from-espresso to-espresso-2 border rounded-lg p-[34px_28px] ${hovered ? "border-brass" : "border-line"}`}
        {...({ onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) } as any)}
      >
        <View className="mb-5">{icon}</View>
        <Text className="text-brass-light font-rye text-xl mb-[10px]">
          {title}
        </Text>
        <Text className="text-cream-dim font-jost text-sm leading-[1.55] font-light">
          {description}
        </Text>
      </View>
    </Animated.View>
  );
}
