import React, { useCallback, useRef, useState } from "react";
import { Pressable, Text, Animated, Platform } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "solid" | "ghost";
  className?: string;
};

export default function BrassButton({
  label,
  onPress,
  variant = "solid",
  className = "",
}: Props) {
  const [hovered, setHovered] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [scaleAnim]);

  const base = "px-[22px] py-[11px] rounded-[2px] items-center";
  const solid = `bg-brass ${hovered ? "bg-brass-light" : ""}`;
  const ghost = `border border-brass ${hovered ? "bg-brass" : ""}`;
  const textSolid =
    "text-noir uppercase text-sm tracking-[0.8px]";
  const textGhost = `text-cream uppercase text-sm tracking-[0.8px] ${hovered ? "text-noir" : ""}`;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...({ onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) } as any)}
        className={`${base} ${variant === "solid" ? solid : ghost} ${className}`}
      >
        <Text className={variant === "solid" ? textSolid : textGhost}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
