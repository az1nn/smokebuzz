import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useCart } from "../context/CartContext";
import { useCartActions } from "../hooks/useCartActions";
import BrassButton from "../components/BrassButton";
import Container from "../components/Container";
import strings from "../strings";

export default function CartScreen({
  onCheckout,
}: {
  onCheckout: () => void;
}) {
  const { items, total } = useCart();
  const { updateQuantity, removeItem } = useCartActions();

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-noir items-center justify-center">
        <Container className="items-center">
          <Text className="text-cream-dim text-lg">
            {strings.cartEmpty}
          </Text>
        </Container>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-noir">
      <Container className="pt-12">
        <Text className="text-brass-light font-rye text-3xl">Carrinho</Text>
      </Container>
      <Container>
        <FlatList
          data={items}
          keyExtractor={(item) => item.product.id}
          contentContainerClassName="pt-0"
          renderItem={({ item }) => (
            <View className="bg-espresso border border-line rounded-xl p-4 mb-3 flex-row items-center">
              <View className="w-16 h-16 bg-white rounded-lg items-center justify-center mr-3">
                {typeof item.product.image === "string" ? (
                  <Text className="text-2xl">{item.product.image}</Text>
                ) : (
                  <Image
                    source={item.product.image}
                    className="w-14 h-14 object-contain"
                    resizeMode="contain"
                  />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-cream font-rye text-base">
                  {item.product.name}
                </Text>
                <Text className="text-brass font-rye text-[18.4px]">
                  R$ {item.product.price.toFixed(2).replace('.', ',')}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Pressable
                    onPress={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="border border-brass rounded-lg w-8 h-8 items-center justify-center"
                  >
                    <Text className="text-brass font-bold">-</Text>
                  </Pressable>
                  <Text className="text-cream mx-3 font-jost">
                    {item.quantity}
                  </Text>
                  <Pressable
                    onPress={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="border border-brass rounded-lg w-8 h-8 items-center justify-center"
                  >
                    <Text className="text-brass font-bold">+</Text>
                  </Pressable>
                </View>
              </View>
              <Pressable
                onPress={() => removeItem(item.product.id)}
                className="ml-2"
              >
                <Text className="text-ember text-lg">✕</Text>
              </Pressable>
            </View>
          )}
        />
      </Container>
      <View className="border-t border-line">
        <Container className="py-4">
          <View className="flex-row justify-between mb-4">
            <Text className="text-cream font-rye text-xl">Total</Text>
            <Text className="text-brass font-rye text-xl">
              R$ {total.toFixed(2).replace('.', ',')}
            </Text>
          </View>
          <BrassButton label="Finalizar Pedido" onPress={onCheckout} />
        </Container>
      </View>
    </View>
  );
}
