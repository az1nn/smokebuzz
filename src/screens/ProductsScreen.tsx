import React, { useState } from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { View, Text, FlatList, Image, ScrollView, useWindowDimensions, Animated } from "react-native";
import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../hooks/useAddToCart";
import { Product } from "../types";
import SectionHeading from "../components/SectionHeading";
import BrassButton from "../components/BrassButton";
import CategoryCard from "../components/CategoryCard";
import RopeDivider from "../components/RopeDivider";

const altTexts: Record<string, string> = {
  "1": "Avulsa por R$ 1,00",
  "2": "Avulsa por R$ 1,50",
};

const categorias = [
  { title: "Charutos", description: "Linha selecionada de charutos nacionais e importados, para todos os paladares." },
  { title: "Cigarros", description: "Principais marcas do mercado, sempre com estoque em dia." },
  { title: "Sedas & Piteiras", description: "Sedas de diversas marcas e piteiras em vidro, metal e madeira." },
  { title: "Tabacos", description: "Tabacos soltos e para cachimbo, com origem e curas variadas." },
  { title: "Acessórios para fumo", description: "Cortadores, cinzeiros, humidores e tudo que compõe o ritual." },
  { title: "Isqueiros", description: "Do básico ao colecionável — sempre um isqueiro à altura do momento." },
];

function renderIcon(title: string) {
  const props = { width: 44, height: 44, viewBox: "0 0 48 48", fill: "none", stroke: "#e6c878", strokeWidth: 1.6 };
  switch (title) {
    case "Charutos":
      return <Svg {...props}><Rect x="4" y="21" width="34" height="7" rx="3.5"/><Path d="M38 24h4a2 2 0 0 1 0 6l-4-1"/></Svg>;
    case "Cigarros":
      return <Svg {...props}><Rect x="10" y="6" width="10" height="36" rx="4"/><Path d="M13 6c0-2 1-4 2-4s2 2 2 4"/></Svg>;
    case "Sedas & Piteiras":
      return <Svg {...props}><Rect x="6" y="14" width="30" height="20" rx="2"/><Path d="M6 20h30M6 28h30"/></Svg>;
    case "Tabacos":
      return <Svg {...props}><Path d="M14 40c-4-8-2-16 4-22 3 4 3 8 1 11 5-1 8-6 7-12 6 5 8 14 3 21-3 4-9 5-15 2z"/></Svg>;
    case "Acessórios para fumo":
      return <Svg {...props}><Circle cx="24" cy="24" r="16"/><Path d="M24 14v10l7 4"/></Svg>;
    case "Isqueiros":
      return <Svg {...props}><Rect x="16" y="16" width="16" height="24" rx="3"/><Path d="M20 16c0-4 2-8 4-8s4 4 4 8"/></Svg>;
    default:
      return null;
  }
}

export default function ProductsScreen({
  onNavigateCart,
}: {
  onNavigateCart: () => void;
}) {
  const { products, loading, error } = useProducts();
  const { addToCart } = useAddToCart();
  const { width } = useWindowDimensions();
  const numColumns = width > 900 ? 4 : 2;

  if (loading) {
    return (
      <View className="flex-1 bg-noir items-center justify-center">
        <Text className="text-cream-dim text-lg">Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-noir items-center justify-center">
        <Text className="text-ember text-lg">Failed to load products</Text>
      </View>
    );
  }

  function ProductCard({ item }: { item: Product }) {
    const [hovered, setHovered] = useState(false);
    return (
      <Animated.View style={{ transform: [{ translateY: hovered ? -6 : 0 }] }}>
        <View
          className={`bg-noir border rounded-lg overflow-hidden m-2 flex-1 min-w-[140px] ${hovered ? "border-brass" : "border-line"}`}
          {...({ onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) } as any)}
        >
          <View className="bg-white aspect-square p-[18px] items-center justify-center">
            {typeof item.image === "string" ? (
              <Text className="text-5xl">{item.image}</Text>
            ) : (
              <Image
                source={item.image}
                className="w-full h-full object-contain"
                resizeMode="contain"
              />
            )}
          </View>
          <View className="p-5 pb-6">
            <Text className="text-brass-light font-rye text-base leading-tight mb-2">
              {item.name}
            </Text>
            <Text className="text-cream font-rye text-lg mb-3">
              R$ {item.price.toFixed(2).replace('.', ',')}
            </Text>
            {altTexts[item.id] && (
              <Text className="text-cream-dim font-jost text-xs tracking-[0.3px] mt-1">
                {altTexts[item.id]}
              </Text>
            )}
            <BrassButton label="Adicionar" onPress={() => addToCart(item)} />
          </View>
        </View>
      </Animated.View>
    );
  }

  const renderProduct = ({ item }: { item: Product }) => <ProductCard item={item} />;

  const renderFooter = () => (
    <>
      <RopeDivider thin />
      <View className="px-7 py-[104px]">
        <SectionHeading
          eyebrow="O que você encontra aqui"
          title="Categorias"
          description="Uma seleção pensada para todo tipo de fumante — do iniciante ao mais exigente."
        />
        <View className="flex-row flex-wrap">
          {categorias.map((cat) => (
            <View
              key={cat.title}
              className={width > 900 ? "w-1/3 p-3" : width > 560 ? "w-1/2 p-3" : "w-full p-3"}
            >
              <CategoryCard
                icon={
                  <View className="w-11 h-11 mb-5 items-center justify-center">
                    {renderIcon(cat.title)}
                  </View>
                }
                title={cat.title}
                description={cat.description}
              />
            </View>
          ))}
        </View>
      </View>
      <RopeDivider thin />
    </>
  );

  return (
    <ScrollView className="flex-1 bg-noir">
      <View className="p-4 pt-12">
        <SectionHeading
          eyebrow="Direto do estoque"
          title="Destaques da semana"
          description="Alguns dos itens mais pedidos no Direct — confirme disponibilidade antes de fechar o pedido."
        />
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        scrollEnabled={false}
        contentContainerClassName="p-2 pb-4"
        ListFooterComponent={renderFooter}
      />
    </ScrollView>
  );
}
