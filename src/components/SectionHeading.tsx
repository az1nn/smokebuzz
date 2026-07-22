import React from "react";
import { View, Text, useWindowDimensions } from "react-native";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  const { width } = useWindowDimensions();
  const h2Size = width < 560 ? "text-3xl" : width < 900 ? "text-4xl" : "text-5xl";
  return (
    <View className="mb-[56px]">
      {eyebrow && (
        <Text className="text-brass uppercase text-xs tracking-[3px] mb-[14px] font-jost">
          {eyebrow}
        </Text>
      )}
      <Text className={`text-brass-light font-rye ${h2Size} mb-4`}>{title}</Text>
      {description && (
        <Text className="text-cream-dim mt-4 font-cormorant text-[19.2px] leading-relaxed">
          {description}
        </Text>
      )}
    </View>
  );
}
