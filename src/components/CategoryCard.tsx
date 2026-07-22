import React from "react";
import { View, Text } from "react-native";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function CategoryCard({ icon, title, description }: Props) {
  return (
    <View className="bg-gradient-to-b from-espresso to-espresso-2 border border-line rounded-lg p-[34px_28px]">
      <View className="mb-5">{icon}</View>
      <Text className="text-brass-light font-rye text-xl mb-[10px]">
        {title}
      </Text>
      <Text className="text-cream-dim font-jost text-sm leading-[1.55] font-light">
        {description}
      </Text>
    </View>
  );
}
