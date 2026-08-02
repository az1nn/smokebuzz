import { View, Text, FlatList, Pressable, Image } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useCart } from "../context/CartContext";
import { useCartActions } from "../hooks/useCartActions";
import BrassButton from "../components/BrassButton";
import Container from "../components/Container";
import strings from "../strings";

function CartEmptyMotif() {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
      <Circle cx="40" cy="40" r="34" stroke="#d9622b" strokeWidth="2" strokeDasharray="8 5" opacity="0.85" />
      <Circle cx="40" cy="40" r="26" stroke="#d9622b" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
      <Path d="M40 14c8 8 8 18 0 26-8-8-8-18 0-26z" fill="#d9622b" opacity="0.85" />
      <Path d="M40 24v14" stroke="#0c0a08" strokeWidth="1.5" />
    </Svg>
  );
}

export default function CartScreen({
  onCheckout,
  onNavigateProducts,
}: {
  onCheckout: () => void;
  onNavigateProducts?: () => void;
}) {
  const { items, total } = useCart();
  const { updateQuantity, removeItem } = useCartActions();

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-noir items-center justify-center">
        <Container className="items-center">
          <CartEmptyMotif />
          <Text className="text-cream font-rye text-2xl mt-6 mb-2 text-center">
            {strings.cartEmptyTitle}
          </Text>
          <Text className="text-cream-dim font-cormorant italic text-center mb-6">
            {strings.cartEmptySub}
          </Text>
          <BrassButton label={strings.viewProducts} onPress={() => onNavigateProducts?.()} />
        </Container>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-noir">
      <Container className="pt-12">
        <Text className="text-brass-light font-rye text-3xl">{strings.cartTitle}</Text>
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
                    accessibilityRole="button"
                    accessibilityLabel={strings.decreaseQuantity}
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
                    accessibilityRole="button"
                    accessibilityLabel={strings.increaseQuantity}
                    className="border border-brass rounded-lg w-8 h-8 items-center justify-center"
                  >
                    <Text className="text-brass font-bold">+</Text>
                  </Pressable>
                </View>
              </View>
              <Pressable
                onPress={() => removeItem(item.product.id)}
                accessibilityRole="button"
                accessibilityLabel={strings.removeItem(item.product.name)}
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
            <Text className="text-cream font-rye text-xl">{strings.totalLabel}</Text>
            <Text className="text-brass font-rye text-xl">
              R$ {total.toFixed(2).replace('.', ',')}
            </Text>
          </View>
          <BrassButton label={strings.cartCheckout} onPress={onCheckout} />
        </Container>
      </View>
    </View>
  );
}
