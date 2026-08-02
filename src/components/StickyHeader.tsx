import React, { useState } from "react";
import { View, Text, Image, Platform, Pressable, useWindowDimensions, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
        className={`text-[14.72px] font-jost tracking-[0.4px] transition-colors duration-200 ${
          hovered ? "text-brass-light" : "text-cream-dim opacity-[0.85]"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function StickyHeader({
  onNavPress,
}: {
  onNavPress?: (section: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const sectionMap: Record<string, string> = {
    destaques: "destaques",
    produtos: "categorias",
    sobre: "sobre",
    localizacao: "localizacao",
    contato: "contato",
  };

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
        paddingTop: 14 + insets.top,
        paddingBottom: 14,
        ...(Platform.OS === "web" ? {
          backdropFilter: "blur(8px)",
          position: "sticky" as any,
          top: 0,
          zIndex: 50,
        } : {}),
      } as any}
    >
      <View className="max-w-[1180px] mx-auto flex-row items-center justify-between">
        <View className="flex-row gap-3 items-center">
          <Image
            source={require("../../assets/logosmokebuzz-transparent.png")}
            className="w-11 h-11 rounded-full"
          />
          <Text className="text-cream text-[18.4px] font-rye">SmokeBuzz</Text>
        </View>
        {Platform.OS === "web" && width > 900 && (
          <View className="flex-row gap-7 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.key}
                label={link.label}
                hovered={hoveredLink === link.key}
                onHover={(v) => setHoveredLink(v ? link.key : null)}
                onPress={() => onNavPress?.(sectionMap[link.key])}
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
            <Text className="text-cream text-[25.6px]">{menuOpen ? "✕" : "☰"}</Text>
          </Pressable>
        )}
      </View>
      {menuOpen && width <= 900 && (
        <View
          className="border-b border-line pt-6 pb-6 px-0"
          style={(Platform.OS === "web" ? { background: "rgba(12,10,8,0.98)" } : { backgroundColor: "#0c0a08" }) as any}
        >
          <View className="gap-5">
            {navLinks.map((link) => (
              <Pressable key={link.key} onPress={() => { onNavPress?.(sectionMap[link.key]); setMenuOpen(false); }}>
                <Text className="text-cream-dim text-[14.72px] font-jost tracking-[0.4px] opacity-[0.85]">
                  {link.label}
                </Text>
              </Pressable>
            ))}
            <View className="pt-2">
              <BrassButton
                label="Chamar no Direct"
                variant="solid"
                onPress={() => Linking.openURL("https://instagram.com/smokebuzztabacaria")}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
