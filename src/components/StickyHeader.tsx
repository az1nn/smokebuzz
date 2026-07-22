import React, { useState } from "react";
import { View, Text, Image, Platform, Pressable, useWindowDimensions } from "react-native";
import BrassButton from "./BrassButton";

export default function StickyHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowDimensions();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <View
      className="bg-noir/86 border-b border-line px-7"
      style={{
        paddingTop: 14,
        paddingBottom: 14,
        ...(Platform.OS === "web" ? { backdropFilter: "blur(8px)" } : {}),
      } as any}
    >
      <View className="max-w-[1180px] mx-auto flex-row items-center justify-between">
        <View className="flex-row gap-3 items-center">
          <Image
            source={require("../../assets/logosmokebuzz-transparent.png")}
            className="w-11 h-11 rounded-full"
          />
          <Text className="text-cream text-lg font-rye">SmokeBuzz</Text>
        </View>
        {Platform.OS === "web" && width > 900 && (
          <View className="flex-row gap-7 items-center">
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85] tracking-[0.4px]">Destaques</Text>
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85] tracking-[0.4px]">Produtos</Text>
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85] tracking-[0.4px]">Sobre</Text>
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85] tracking-[0.4px]">Localização</Text>
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85] tracking-[0.4px]">Contato</Text>
            <BrassButton
              label="Chamar no Direct"
              variant="solid"
              onPress={() => {}}
            />
          </View>
        )}
        {width <= 900 && (
          <Pressable onPress={toggleMenu} className="p-2">
            <Text className="text-cream text-2xl">{menuOpen ? "✕" : "☰"}</Text>
          </Pressable>
        )}
      </View>
      {menuOpen && width <= 900 && (
        <View className="mt-4 pt-4 border-t border-line">
          <View className="gap-4">
            <Text className="text-cream-dim text-sm font-jost tracking-[0.4px]">Destaques</Text>
            <Text className="text-cream-dim text-sm font-jost tracking-[0.4px]">Produtos</Text>
            <Text className="text-cream-dim text-sm font-jost tracking-[0.4px]">Sobre</Text>
            <Text className="text-cream-dim text-sm font-jost tracking-[0.4px]">Localização</Text>
            <Text className="text-cream-dim text-sm font-jost tracking-[0.4px]">Contato</Text>
            <BrassButton
              label="Chamar no Direct"
              variant="solid"
              onPress={() => {}}
            />
          </View>
        </View>
      )}
    </View>
  );
}
