import "./global.css";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CartProvider, useCart } from "./src/context/CartContext";
import HomeScreen from "./src/screens/HomeScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import CartScreen from "./src/screens/CartScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import { Screen } from "./src/types";

function TabBar({
  current,
  onTab,
  itemCount,
}: {
  current: Screen;
  onTab: (screen: Screen) => void;
  itemCount: number;
}) {
  const tabs: { key: Screen; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "products", label: "Produtos" },
    { key: "cart", label: "Carrinho" },
  ];

  return (
    <View className="flex-row bg-espresso border-t border-line">
      {tabs.map(({ key, label }) =>
        key === "checkout" ? null : (
          <Pressable
            key={key}
            className={`flex-1 items-center py-3 ${
              current === key ? "border-t-2 border-brass-light" : ""
            }`}
            onPress={() => onTab(key)}
          >
            <View className="flex-row items-center">
              <Text
                className={
                  current === key ? "text-brass-light" : "text-cream-dim"
                }
              >
                {label}
              </Text>
              {key === "cart" && itemCount > 0 && (
                <View className="bg-ember rounded-full ml-1 px-1.5">
                  <Text className="text-white text-xs font-bold">
                    {itemCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        )
      )}
    </View>
  );
}

function AppInner() {
  const { itemCount } = useCart();
  const [screen, setScreen] = useState<Screen>("home");

  const handleTab = useCallback((newScreen: Screen) => {
    setScreen(newScreen);
  }, []);

  return (
    <View className="flex-1 bg-noir">
      {screen === "home" && (
        <HomeScreen onNavigateProducts={() => setScreen("products")} />
      )}
      {screen === "products" && (
        <ProductsScreen onNavigateCart={() => setScreen("cart")} />
      )}
      {screen === "cart" && (
        <CartScreen onCheckout={() => setScreen("checkout")} />
      )}
      {screen === "checkout" && (
        <CheckoutScreen onDone={() => setScreen("home")} />
      )}
      {screen !== "checkout" && (
        <TabBar
          current={screen}
          onTab={handleTab}
          itemCount={itemCount}
        />
      )}
      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
