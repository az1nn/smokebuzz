import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen({
  onCheckout,
}: {
  onCheckout: () => void;
}) {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-slate-900 items-center justify-center">
        <Text className="text-slate-400 text-lg">Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-900">
      <Text className="text-white text-2xl font-bold p-4">Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerClassName="p-4 pt-0"
        renderItem={({ item }) => (
          <View className="bg-slate-800 rounded-xl p-4 mb-3 flex-row items-center">
            <Text className="text-3xl mr-3">{item.product.image}</Text>
            <View className="flex-1">
              <Text className="text-white font-bold">{item.product.name}</Text>
              <Text className="text-sky-400">
                R$ {item.product.price.toFixed(2)}
              </Text>
              <View className="flex-row items-center mt-2">
                <Pressable
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  className="bg-slate-700 rounded-lg w-8 h-8 items-center justify-center"
                >
                  <Text className="text-white font-bold">-</Text>
                </Pressable>
                <Text className="text-white mx-3">{item.quantity}</Text>
                <Pressable
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="bg-slate-700 rounded-lg w-8 h-8 items-center justify-center"
                >
                  <Text className="text-white font-bold">+</Text>
                </Pressable>
              </View>
            </View>
            <Pressable
              onPress={() => removeItem(item.product.id)}
              className="ml-2"
            >
              <Text className="text-red-400 text-lg">✕</Text>
            </Pressable>
          </View>
        )}
      />
      <View className="p-4 border-t border-slate-700">
        <Text className="text-white text-xl font-bold mb-3">
          Total: R$ {total.toFixed(2)}
        </Text>
        <Pressable
          onPress={onCheckout}
          className="bg-green-500 rounded-xl py-3 items-center"
        >
          <Text className="text-white font-bold text-lg">Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}
