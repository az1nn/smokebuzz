import React from "react";
import { View, Text, Image, Animated } from "react-native";
import BrassButton from "./BrassButton";
import { Product } from "../types";

type ProductCardProps = {
  product: Product;
  altText?: string;
  onAdd: () => void;
};

export default function ProductCard({ product, altText, onAdd }: ProductCardProps) {
  return (
    <Animated.View style={{ transform: [{ translateY: 0 }] }}>
      <View className="bg-noir border border-line rounded-lg overflow-hidden flex-1 min-w-[140px]">
        <View className="bg-white aspect-square p-[18px] items-center justify-center">
          {typeof product.image === "string" ? (
            <Text className="text-5xl">{product.image}</Text>
          ) : (
            <Image
              source={product.image}
              className="w-full h-full object-contain"
              resizeMode="contain"
            />
          )}
        </View>
        <View className="p-5 pb-6">
          <Text className="text-brass-light font-rye text-[16.8px] leading-[1.3] mb-2">
            {product.name}
          </Text>
          <Text className="text-cream font-rye text-[18.4px] m-0">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </Text>
          {altText && (
            <Text className="text-cream-dim font-jost text-[12.48px] tracking-[0.3px] mt-1">
              {altText}
            </Text>
          )}
          <BrassButton label="Adicionar" size="sm" onPress={onAdd} />
        </View>
      </View>
    </Animated.View>
  );
}
