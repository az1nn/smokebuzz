import React from "react";
import { View } from "react-native";

type ContainerProps = {
  maxWidth?: number;
  paddingX?: number;
  className?: string;
  children: React.ReactNode;
};

export default function Container({
  maxWidth = 1180,
  paddingX = 28,
  className = "",
  children,
}: ContainerProps) {
  return (
    <View
      className={"w-full mx-auto " + className}
      style={{ maxWidth, paddingHorizontal: paddingX }}
    >
      {children}
    </View>
  );
}
