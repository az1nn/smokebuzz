import React, { useEffect, useRef } from "react";
import { ScrollView, View, Text, Image, Animated } from "react-native";
import RopeDivider from "../components/RopeDivider";
import SectionHeading from "../components/SectionHeading";
import BrassButton from "../components/BrassButton";

const diferenciais = [
  {
    num: "01",
    title: "Curadoria Premium",
    desc: "Selecionamos a dedo cada produto para garantir a melhor experiência aos nossos clientes.",
  },
  {
    num: "02",
    title: "Atendimento Personalizado",
    desc: "Nossa equipe é treinada para oferecer recomendações sob medida para cada necessidade.",
  },
  {
    num: "03",
    title: "Ambiente Acolhedor",
    desc: "Um espaço pensado para você se sentir em casa enquanto escolhe seus produtos.",
  },
];

export default function HomeScreen({
  onNavigateProducts,
}: {
  onNavigateProducts: () => void;
}) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [floatAnim]);

  return (
    <ScrollView className="flex-1 bg-noir">
      <View
        className="min-h-[92vh] bg-noir items-center justify-center px-7 pt-20"
      >
        <Animated.Image
          source={require("../../assets/logo_smokebuzz.png")}
          className="w-[200px] h-[200px] rounded-full mb-8"
          style={{ transform: [{ translateY: floatAnim }] }}
        />
        <Text className="text-cream-dim uppercase text-xs tracking-[3px] mb-3 font-jost">
          Tabacaria desde 2026
        </Text>
        <Text className="text-brass-light font-rye text-5xl text-center mb-4">
          SmokeBuzz
        </Text>
        <Text className="text-cream-dim font-cormorant italic text-lg text-center leading-relaxed max-w-[600px] mb-10">
          Sua tabacaria de confiança. Variedade, qualidade e tradição em cada
          produto.
        </Text>
        <View className="flex-row gap-4">
          <BrassButton label="Chamar no Direct" onPress={() => {}} />
          <BrassButton
            label="Ver Produtos"
            onPress={onNavigateProducts}
            variant="ghost"
          />
        </View>
      </View>

      <RopeDivider />

      <View className="bg-espresso px-7 py-20">
        <View className="max-w-[1180px] mx-auto">
          <View className="flex-row gap-8 items-center flex-wrap">
            <Image
              source={require("../../assets/logo_smokebuzz.png")}
              className="w-[160px] h-[160px] rounded-full"
            />
            <View className="flex-1 min-w-[250px]">
              <SectionHeading
                eyebrow="Quem somos"
                title="Sobre Nós"
                description="A SmokeBuzz é mais que uma tabacaria — é um ponto de encontro para quem valoriza qualidade e tradição. Trabalhamos com as melhores marcas do mercado para oferecer a melhor experiência aos nossos clientes."
              />
            </View>
          </View>
          <View className="flex-row gap-8 mt-8">
            <View className="flex-1 items-center">
              <Text className="text-brass-light font-rye text-3xl">6+</Text>
              <Text className="text-cream-dim font-jost text-sm">
                Categorias
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-brass-light font-rye text-3xl">100%</Text>
              <Text className="text-cream-dim font-jost text-sm">
                Atendimento
              </Text>
            </View>
          </View>
        </View>
      </View>

      <RopeDivider thin />

      <View className="bg-espresso px-7 py-20">
        <View className="max-w-[1180px] mx-auto">
          <SectionHeading
            eyebrow="Por que nos escolher"
            title="Nossos Diferenciais"
          />
          <View className="gap-8">
            {diferenciais.map((item, i) => (
              <View key={i} className="flex-row gap-4">
                <Text className="text-ember font-rye text-4xl w-12">
                  {item.num}
                </Text>
                <View className="flex-1">
                  <Text className="text-brass-light font-rye text-xl mb-2">
                    {item.title}
                  </Text>
                  <Text className="text-cream-dim font-jost text-sm leading-relaxed">
                    {item.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="bg-noir px-7 py-20">
        <View className="max-w-[1180px] mx-auto">
          <SectionHeading
            eyebrow="Onde estamos"
            title="Localização"
          />
          <View className="flex-row gap-8 flex-wrap">
            <View className="flex-1 min-w-[200px]">
              <Text className="text-cream font-rye text-lg mb-2">
                Rua Augusta, 1500
              </Text>
              <Text className="text-cream-dim font-jost text-sm">
                Consolação, São Paulo - SP
              </Text>
              <Text className="text-cream-dim font-jost text-sm mt-1">
                Seg-Sáb: 9h às 22h
              </Text>
            </View>
            <View className="flex-1 min-w-[200px] bg-espresso-2 rounded-lg h-32 items-center justify-center border border-line">
              <Text className="text-cream-dim font-jost text-sm">
                Mapa Interativo
              </Text>
            </View>
          </View>
        </View>
      </View>

      <RopeDivider />

      <View className="bg-espresso px-7 py-20 items-center">
        <View className="max-w-[1180px] mx-auto items-center">
          <SectionHeading
            eyebrow="Fale conosco"
            title="Entre em Contato"
          />
          <Text className="text-cream-dim font-jost text-sm text-center mb-8 max-w-[500px]">
            Tem alguma dúvida ou quer fazer um pedido especial? Nos chame no
            direct!
          </Text>
          <View className="flex-row gap-4">
            <BrassButton label="Chamar no Direct" onPress={() => {}} />
            <BrassButton
              label="Ver Produtos"
              onPress={onNavigateProducts}
              variant="ghost"
            />
          </View>
        </View>
      </View>

      <View className="bg-noir px-7 py-12 items-center border-t border-line">
        <Image
          source={require("../../assets/logo_smokebuzz.png")}
          className="w-12 h-12 rounded-full mb-3"
        />
        <Text className="text-brass-light font-rye text-lg mb-4">
          SmokeBuzz
        </Text>
        <View className="flex-row gap-6 mb-4">
          <Text className="text-cream-dim font-jost text-xs">Produtos</Text>
          <Text className="text-cream-dim font-jost text-xs">Sobre</Text>
          <Text className="text-cream-dim font-jost text-xs">Contato</Text>
        </View>
        <Text className="text-cream-dim font-jost text-xs text-center">
          2026 SmokeBuzz Tabacaria. Todos os direitos reservados.
        </Text>
        <Text className="text-cream-dim font-jost text-xs text-center mt-2">
          Produtos destinados a maiores de 18 anos.
        </Text>
      </View>
    </ScrollView>
  );
}
