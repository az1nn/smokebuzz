import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../hooks/useAddToCart";

export default function ProductsScreen({
  onNavigateCart,
}: {
  onNavigateCart: () => void;
}) {
  const { products, loading, error } = useProducts();
  const { addToCart } = useAddToCart();

  if (loading) {
    return (
      <View className="flex-1 bg-slate-900 items-center justify-center">
        <Text className="text-slate-400 text-lg">Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-slate-900 items-center justify-center">
        <Text className="text-red-400 text-lg">Failed to load products</Text>
      </View>
    );
  }

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <View className="bg-slate-800 rounded-xl p-4 m-2 flex-1 min-w-[140px]">
      <Image
        source={item.image}
        className="w-32 h-32 object-contain mb-2 mx-auto"
        resizeMode="contain"
      />
      <Text className="text-white font-bold text-base text-center">{item.name}</Text>
      <Text className="text-slate-400 text-sm mt-1 text-center">{item.description}</Text>
      <Text className="text-sky-400 font-bold text-lg mt-2 text-center">
        R$ {item.price.toFixed(2)}
      </Text>
      <Pressable
        onPress={() => addToCart(item)}
        className="bg-sky-500 rounded-lg py-2 mt-3 items-center"
      >
        <Text className="text-white font-semibold">Add to Cart</Text>
      </Pressable>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-900">
      <Text className="text-white text-2xl font-bold p-4">Products</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerClassName="p-2"
      />
    </View>
  );
}