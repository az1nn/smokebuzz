import "./global.css";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CartProvider, useCart } from "./src/context/CartContext";
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
  const tabClass = (screen: Screen) =>
    `flex-1 items-center py-3 ${
      current === screen ? "border-t-2 border-sky-400" : ""
    }`;

  return (
    <View className="flex-row bg-slate-800 border-t border-slate-700">
      <Pressable className={tabClass("products")} onPress={() => onTab("products")}>
        <Text
          className={
            current === "products" ? "text-sky-400" : "text-slate-400"
          }
        >
          🏪 Products
        </Text>
      </Pressable>
      <Pressable className={tabClass("cart")} onPress={() => onTab("cart")}>
        <View className="flex-row items-center">
          <Text
            className={
              current === "cart" ? "text-sky-400" : "text-slate-400"
            }
          >
            🛒 Cart
          </Text>
          {itemCount > 0 && (
            <View className="bg-red-500 rounded-full ml-1 px-1.5">
              <Text className="text-white text-xs font-bold">
                {itemCount}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}

function AppInner() {
  const { itemCount } = useCart();
  const [screen, setScreen] = useState<Screen>("products");

  const handleTab = useCallback((newScreen: Screen) => {
    setScreen(newScreen);
  }, []);

  return (
    <View className="flex-1 bg-slate-900">
      {screen === "products" && (
        <ProductsScreen onNavigateCart={() => setScreen("cart")} />
      )}
      {screen === "cart" && (
        <CartScreen onCheckout={() => setScreen("checkout")} />
      )}
      {screen === "checkout" && (
        <CheckoutScreen onDone={() => setScreen("products")} />
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