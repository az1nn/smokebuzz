import React from "react";
import { View, Text, useWindowDimensions } from "react-native";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  const { width } = useWindowDimensions();
  const h2Size = Math.min(Math.max(width * 0.034, 30.4), 44.8);
  return (
    <View className="mb-[56px]">
      {eyebrow && (
        <Text className="text-brass uppercase text-[12.48px] tracking-[3px] mb-[14px] font-jost">
          {eyebrow}
        </Text>
      )}
      <Text className="text-brass-light font-rye mb-4 tracking-[0.5px]" style={{ fontSize: h2Size }}>{title}</Text>
      {description && (
        <Text className="text-cream-dim font-cormorant text-[19.2px] leading-[1.55]">
          {description}
        </Text>
      )}
    </View>
  );
}
