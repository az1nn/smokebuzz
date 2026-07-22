import React from "react";
import { View, Text, Image, Platform } from "react-native";
import BrassButton from "./BrassButton";

export default function StickyHeader() {
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
            source={require("../../assets/logo_smokebuzz.png")}
            className="w-11 h-11 rounded-full"
          />
          <Text className="text-cream text-lg font-rye">SmokeBuzz</Text>
        </View>
        {Platform.OS === "web" && (
          <View className="flex-row gap-7 items-center">
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85]">Destaques</Text>
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85]">Produtos</Text>
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85]">Sobre</Text>
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85]">Localização</Text>
            <Text className="text-cream-dim text-sm font-jost opacity-[0.85]">Contato</Text>
            <BrassButton
              label="Chamar no Direct"
              variant="solid"
              onPress={() => {}}
            />
          </View>
        )}
      </View>
    </View>
  );
}
