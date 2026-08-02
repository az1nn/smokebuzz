import "./global.css";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, Text, Animated, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { CartProvider, useCart } from "./src/context/CartContext";
import HomeScreen from "./src/screens/HomeScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import CartScreen from "./src/screens/CartScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import StickyHeader from "./src/components/StickyHeader";
import { AppPressable } from "./src/components/AppPressable";
import { ScreenTransition } from "./src/components/ScreenTransition";
import { usePrefersReducedMotion } from "./src/hooks/usePrefersReducedMotion";
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
  const insets = useSafeAreaInsets();
  const reduced = usePrefersReducedMotion();
  const badgeScale = useRef(new Animated.Value(1)).current;
  const prevCount = useRef(itemCount);

  useEffect(() => {
    const increased = itemCount > prevCount.current;
    prevCount.current = itemCount;
    if (!increased || reduced) return;
    badgeScale.setValue(1);
    Animated.sequence([
      Animated.spring(badgeScale, {
        toValue: 1.25,
        friction: 4,
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start();
  }, [itemCount, reduced, badgeScale]);

  return (
    <View
      className="flex-row bg-espresso border-t border-line"
      style={{ paddingBottom: insets.bottom + 10 }}
    >
      {tabs.map(({ key, label }) => {
        const active = current === key;
        return (
          <AppPressable
            key={key}
            className={`flex-1 items-center py-3 ${
              active ? "border-t-2 border-brass-light" : ""
            }`}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={
              key === "cart" ? "Carrinho (" + itemCount + " itens)" : undefined
            }
            onPress={() => onTab(key)}
          >
            <View className="flex-row items-center">
              <Text
                className={active ? "text-brass-light" : "text-cream-dim"}
              >
                {label}
              </Text>
              {key === "cart" && itemCount > 0 && (
                <Animated.View
                  className="bg-ember rounded-full ml-1 px-1.5"
                  style={{ transform: [{ scale: badgeScale }] }}
                >
                  <Text className="text-white text-xs font-bold">
                    {itemCount}
                  </Text>
                </Animated.View>
              )}
            </View>
          </AppPressable>
        );
      })}
    </View>
  );
}

function AppInner() {
  const { itemCount } = useCart();
  const [screen, setScreen] = useState<Screen>("home");
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);
  const [scrollSignal, setScrollSignal] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleTab = useCallback((newScreen: Screen) => {
    setScreen(newScreen);
    setScrolled(false);
    setActiveSection(null);
  }, []);

  const handleNavPress = useCallback((section: string) => {
    setScreen("home");
    setScrollToSection(section);
    setScrollSignal((prev) => prev + 1);
  }, []);

  const handleScrollState = useCallback(
    (state: { scrolled: boolean; activeSection: string | null }) => {
      setScrolled(state.scrolled);
      setActiveSection(state.activeSection);
    },
    []
  );

  return (
    <View className="flex-1 bg-noir">
      <StickyHeader
        onNavPress={handleNavPress}
        scrolled={scrolled}
        activeSection={activeSection}
      />
      <ScreenTransition key={screen}>
        {screen === "home" && (
          <HomeScreen
            onNavigateProducts={() => setScreen("products")}
            scrollToSection={scrollToSection}
            scrollSignal={scrollSignal}
            onScrollState={handleScrollState}
          />
        )}
        {screen === "products" && <ProductsScreen />}
        {screen === "cart" && (
          <CartScreen
            onCheckout={() => setScreen("checkout")}
            onNavigateProducts={() => setScreen("products")}
          />
        )}
        {screen === "checkout" && (
          <CheckoutScreen onDone={() => setScreen("home")} />
        )}
      </ScreenTransition>
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
    <SafeAreaProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </SafeAreaProvider>
  );
}
