import React from "react";
import { Pressable, Text } from "react-native";

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
  const base = "px-5 py-2.5 rounded items-center";
  const solid = "bg-brass";
  const ghost = "border border-brass";
  const textSolid =
    "text-noir uppercase text-xs tracking-[0.8px] font-semibold";
  const textGhost = "text-cream uppercase text-xs tracking-[0.8px]";

  return (
    <Pressable
      onPress={onPress}
      className={`${base} ${variant === "solid" ? solid : ghost} ${className}`}
    >
      <Text className={variant === "solid" ? textSolid : textGhost}>
        {label}
      </Text>
    </Pressable>
  );
}
