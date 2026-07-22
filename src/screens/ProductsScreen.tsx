import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../hooks/useAddToCart";
import { Product } from "../types";
import SectionHeading from "../components/SectionHeading";
import BrassButton from "../components/BrassButton";

export default function ProductsScreen({
  onNavigateCart,
}: {
  onNavigateCart: () => void;
}) {
  const { products, loading, error } = useProducts();
  const { addToCart } = useAddToCart();

  if (loading) {
    return (
      <View className="flex-1 bg-noir items-center justify-center">
        <Text className="text-cream-dim text-lg">Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-noir items-center justify-center">
        <Text className="text-ember text-lg">Failed to load products</Text>
      </View>
    );
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <View className="bg-noir border border-line rounded-lg overflow-hidden m-2 flex-1 min-w-[140px]">
      <View className="bg-white aspect-square p-4 items-center justify-center">
        {typeof item.image === "string" ? (
          <Text className="text-5xl">{item.image}</Text>
        ) : (
          <Image
            source={item.image}
            className="w-full h-full object-contain"
            resizeMode="contain"
          />
        )}
      </View>
      <View className="p-5 pb-6">
        <Text className="text-brass-light font-rye text-base leading-tight mb-2">
          {item.name}
        </Text>
        <Text className="text-cream font-rye text-lg mb-3">
          R$ {item.price.toFixed(2)}
        </Text>
        <BrassButton label="Adicionar" onPress={() => addToCart(item)} />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-noir">
      <View className="p-4 pt-12">
        <SectionHeading
          eyebrow="Direto do estoque"
          title="Destaques da semana"
        />
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerClassName="p-2 pb-4"
      />
    </View>
  );
}
