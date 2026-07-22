import React from "react";
import { View, Text, FlatList, Image, ScrollView, useWindowDimensions } from "react-native";
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
  { icon: "🚬", title: "Charutos", description: "Linha selecionada de charutos nacionais e importados, para todos os paladares." },
  { icon: "🚬", title: "Cigarros", description: "Principais marcas do mercado, sempre com estoque em dia." },
  { icon: "📜", title: "Sedas & Piteiras", description: "Sedas de diversas marcas e piteiras em vidro, metal e madeira." },
  { icon: "🍂", title: "Tabacos", description: "Tabacos soltos e para cachimbo, com origem e curas variadas." },
  { icon: "⏱️", title: "Acessórios para fumo", description: "Cortadores, cinzeiros, humidores e tudo que compõe o ritual." },
  { icon: "🔥", title: "Isqueiros", description: "Do básico ao colecionável — sempre um isqueiro à altura do momento." },
];

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

  const renderProduct = ({ item }: { item: Product }) => (
    <View className="bg-noir border border-line rounded-lg overflow-hidden m-2 flex-1 min-w-[140px]">
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
  );

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
                    <Text className="text-brass-light text-2xl">{cat.icon}</Text>
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
