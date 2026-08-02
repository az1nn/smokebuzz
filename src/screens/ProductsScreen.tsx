import { View, Text, FlatList, ScrollView } from "react-native";
import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../hooks/useAddToCart";
import { useBreakpoints, prodCols, catCols } from "../hooks/useBreakpoints";
import SectionHeading from "../components/SectionHeading";
import CategoryCard from "../components/CategoryCard";
import RopeDivider from "../components/RopeDivider";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import BrassButton from "../components/BrassButton";
import Container from "../components/Container";
import { categorias, renderIcon } from "../data/categories";
import { productAlt } from "../data/products";
import strings from "../strings";
import { Product } from "../types";

export default function ProductsScreen() {
  const { products, loading, error, refetch } = useProducts();
  const { addToCart } = useAddToCart();
  const { isDesktop, isMobile } = useBreakpoints();
  const numColumns = prodCols(isDesktop);
  const catCount = catCols(isDesktop, isMobile);
  const catWidth =
    catCount === 3 ? "w-[calc(33.333%-16px)]" : catCount === 2 ? "w-[calc(50%-12px)]" : "w-full";

  const skeletonData = Array.from({ length: numColumns }, (_, i) => i);

  const renderSkeleton = () => <ProductCardSkeleton />;

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} altText={productAlt[item.id]} onAdd={() => addToCart(item)} />
  );

  const renderFooter = () => (
    <>
      <RopeDivider thin />
      <View className="py-[104px]">
        <SectionHeading
          eyebrow={strings.categoriesEyebrow}
          title={strings.categoriesTitle}
          description={strings.categoriesDescription}
        />
        <View className="flex-row flex-wrap" style={{ gap: 24 }}>
          {categorias.map((cat) => (
            <View
              key={cat.title}
              className={catWidth}
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

  if (loading) {
    return (
      <ScrollView className="flex-1 bg-espresso">
        <Container className="pt-12">
          <SectionHeading
            eyebrow={strings.productsEyebrow}
            title={strings.productsTitle}
            description={strings.productsDescription}
          />
        </Container>
        <Container>
          <FlatList
            data={skeletonData}
            renderItem={renderSkeleton}
            keyExtractor={(item) => String(item)}
            numColumns={numColumns}
            key={numColumns}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 24, paddingBottom: 16 }}
          />
        </Container>
      </ScrollView>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-noir items-center justify-center">
        <Container className="items-center">
          <RopeDivider thin />
          <Text className="text-cream font-rye text-2xl mt-6 mb-2 text-center">
            {strings.productsLoadFailedTitle}
          </Text>
          <Text className="text-cream-dim font-cormorant italic text-center mb-6">
            {strings.productsLoadFailedSub}
          </Text>
          <BrassButton label={strings.productsRetry} variant="ghost" onPress={refetch} />
        </Container>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-espresso">
      <Container className="pt-12">
        <SectionHeading
          eyebrow={strings.productsEyebrow}
          title={strings.productsTitle}
          description={strings.productsDescription}
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
