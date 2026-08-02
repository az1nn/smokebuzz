import { View, Text, FlatList, ScrollView } from "react-native";
import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../hooks/useAddToCart";
import { useBreakpoints, prodCols } from "../hooks/useBreakpoints";
import SectionHeading from "../components/SectionHeading";
import CategoryCard from "../components/CategoryCard";
import RopeDivider from "../components/RopeDivider";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { categorias, renderIcon } from "../data/categories";
import { productAlt } from "../data/products";
import strings from "../strings";
import { Product } from "../types";

export default function ProductsScreen() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useAddToCart();
  const { isDesktop, isMobile } = useBreakpoints();
  const numColumns = prodCols(isDesktop);

  if (loading) {
    return (
      <View className="flex-1 bg-noir items-center justify-center">
        <Text className="text-cream-dim text-lg">{strings.productsLoading}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-noir items-center justify-center">
        <Text className="text-ember text-lg">{strings.productsLoadFailed}</Text>
      </View>
    );
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} altText={productAlt[item.id]} onAdd={() => addToCart(item)} />
  );

  const renderFooter = () => (
    <>
      <RopeDivider thin />
      <View className="py-[104px]">
        <SectionHeading
          eyebrow="O que você encontra aqui"
          title="Categorias"
          description="Uma seleção pensada para todo tipo de fumante — do iniciante ao mais exigente."
        />
        <View className="flex-row flex-wrap" style={{ gap: 24 }}>
          {categorias.map((cat) => (
            <View
              key={cat.title}
              className={isDesktop ? "w-[calc(33.333%-16px)]" : isMobile ? "w-full" : "w-[calc(50%-12px)]"}
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
    <ScrollView className="flex-1 bg-espresso">
      <Container className="pt-12">
        <SectionHeading
          eyebrow="Direto do estoque"
          title="Destaques da semana"
          description="Alguns dos itens mais pedidos no Direct — confirme disponibilidade antes de fechar o pedido."
        />
      </Container>
      <Container>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={numColumns}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 24, paddingBottom: 16 }}
          ListFooterComponent={renderFooter}
        />
      </Container>
    </ScrollView>
  );
}
