import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { Product } from "../types";

export default function ProductsScreen({
  onNavigateCart,
}: {
  onNavigateCart: () => void;
}) {
  const { addItem } = useCart();

  const renderProduct = ({ item }: { item: Product }) => (
    <View className="bg-slate-800 rounded-xl p-4 m-2 flex-1 min-w-[140px]">
      <Text className="text-4xl text-center mb-2">{item.image}</Text>
      <Text className="text-white font-bold text-base">{item.name}</Text>
      <Text className="text-slate-400 text-sm mt-1">{item.description}</Text>
      <Text className="text-sky-400 font-bold text-lg mt-2">
        R$ {item.price.toFixed(2)}
      </Text>
      <Pressable
        onPress={() => addItem(item)}
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
