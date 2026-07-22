import React from "react";
import { View, Text } from "react-native";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <View className="mb-10">
      {eyebrow && (
        <Text className="text-cream-dim uppercase text-xs tracking-[3px] mb-2 font-jost">
          {eyebrow}
        </Text>
      )}
      <Text className="text-brass-light font-rye text-3xl">{title}</Text>
      {description && (
        <Text className="text-cream-dim mt-4 font-jost text-sm leading-relaxed">
          {description}
        </Text>
      )}
    </View>
  );
}
