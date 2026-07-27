import React, { useState } from "react";
import { View, Text, Image, Platform, Pressable, useWindowDimensions, Linking } from "react-native";
import BrassButton from "./BrassButton";

function NavLink({
  label,
  hovered,
  onHover,
  onPress,
}: {
  label: string;
  hovered: boolean;
  onHover: (v: boolean) => void;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      {...({ onMouseEnter: () => onHover(true), onMouseLeave: () => onHover(false) } as any)}
    >
      <Text
        className={`text-sm font-jost tracking-[0.4px] transition-colors duration-200 ${
          hovered ? "text-brass-light" : "text-cream-dim opacity-[0.85]"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function StickyHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinks = [
    { key: "destaques", label: "Destaques" },
    { key: "produtos", label: "Produtos" },
    { key: "sobre", label: "Sobre" },
    { key: "localizacao", label: "Localização" },
    { key: "contato", label: "Contato" },
  ];

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
            {navLinks.map((link) => (
              <NavLink
                key={link.key}
                label={link.label}
                hovered={hoveredLink === link.key}
                onHover={(v) => setHoveredLink(v ? link.key : null)}
              />
            ))}
            <BrassButton
              label="Chamar no Direct"
              variant="solid"
              onPress={() => Linking.openURL("https://instagram.com/smokebuzztabacaria")}
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
            {navLinks.map((link) => (
              <Pressable key={link.key} onPress={() => {}}>
                <Text className="text-cream-dim text-sm font-jost tracking-[0.4px]">
                  {link.label}
                </Text>
              </Pressable>
            ))}
            <BrassButton
              label="Chamar no Direct"
              variant="solid"
              onPress={() => Linking.openURL("https://instagram.com/smokebuzztabacaria")}
            />
          </View>
        </View>
      )}
    </View>
  );
}
