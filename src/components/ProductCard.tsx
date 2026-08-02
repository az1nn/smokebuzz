import React, { useCallback, useRef } from "react";
import { View, Text, Image, Animated, Platform, Easing } from "react-native";
import BrassButton from "./BrassButton";
import { Product } from "../types";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const LINE = "rgba(201,162,75,0.28)";
const BRASS = "#c9a24b";

type ProductCardProps = {
  product: Product;
  altText?: string;
  onAdd: () => void;
};

export default function ProductCard({ product, altText, onAdd }: ProductCardProps) {
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

  const handleEnter = useCallback(() => {
    if (reducedMotion) {
      border.setValue(1);
      return;
    }
    Animated.timing(lift, {
      toValue: 1,
      duration: 250,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: nativeDriver,
    }).start();
    Animated.timing(border, {
      toValue: 1,
      duration: 250,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: false,
    }).start();
  }, [lift, border, nativeDriver, reducedMotion]);

  const handleLeave = useCallback(() => {
    if (reducedMotion) {
      border.setValue(0);
      return;
    }
    Animated.timing(lift, {
      toValue: 0,
      duration: 250,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: nativeDriver,
    }).start();
    Animated.timing(border, {
      toValue: 0,
      duration: 250,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: false,
    }).start();
  }, [lift, border, nativeDriver, reducedMotion]);

  return (
    <Animated.View style={reducedMotion ? undefined : { transform: [{ translateY }] }}>
      <Animated.View
        className="bg-noir border rounded-lg overflow-hidden flex-1 min-w-[140px]"
        style={{ borderColor }}
        {...({ onMouseEnter: handleEnter, onMouseLeave: handleLeave } as any)}
      >
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
      </Animated.View>
    </Animated.View>
  );
}
