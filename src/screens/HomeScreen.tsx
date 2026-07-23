import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, Image, Animated, Dimensions, Platform } from "react-native";
import Svg, { Circle } from "react-native-svg";
import RopeDivider from "../components/RopeDivider";
import SectionHeading from "../components/SectionHeading";
import BrassButton from "../components/BrassButton";

const diferenciais = [
  {
    label: "Curadoria",
    title: "Produtos selecionados",
    desc: "Cada item do catálogo passa por uma escolha criteriosa — nada de prateleira lotada só por lotar.",
  },
  {
    label: "Atendimento",
    title: "Quem entende te ajuda",
    desc: "Nossa equipe conhece cada produto e ajuda você a encontrar o que combina com o seu gosto.",
  },
  {
    label: "Ambiente",
    title: "Feito para apreciar",
    desc: "Um espaço pensado para quem gosta de tirar um tempo para escolher e experimentar com calma.",
  },
];

export default function HomeScreen({
  onNavigateProducts,
}: {
  onNavigateProducts: () => void;
}) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const wisp1Anim = useRef(new Animated.Value(0)).current;
  const wisp2Anim = useRef(new Animated.Value(0.5)).current;
  const wisp3Anim = useRef(new Animated.Value(0.5)).current;
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -14,
          duration: 3000,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: Platform.OS !== "web",
        }),
      ])
    );
    float.start();

    const drift = (anim: Animated.Value, duration: number) => {
      const half = (duration * 1000) / 2;
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 0.5,
            duration: half,
            useNativeDriver: Platform.OS !== "web",
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: half,
            useNativeDriver: Platform.OS !== "web",
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: Platform.OS !== "web",
          }),
        ])
      );
    };

    drift(wisp1Anim, 14).start();
    drift(wisp2Anim, 19).start();
    drift(wisp3Anim, 23).start();

    return () => {
      float.stop();
      wisp1Anim.stopAnimation();
      wisp2Anim.stopAnimation();
      wisp3Anim.stopAnimation();
    };
  }, [floatAnim, wisp1Anim, wisp2Anim, wisp3Anim, reducedMotion]);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const wispInterpolate = (anim: Animated.Value) => ({
    opacity: anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.35, 0.55, 0],
    }),
    transform: [
      {
        translateX: anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 20, -10],
        }),
      },
      {
        translateY: anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, -60, -140],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.15, 0.9],
        }),
      },
    ],
  });

  const { width } = Dimensions.get("window");
  const isMobile = width < 900;
  const sectionPad = width <= 560 ? "py-[72px]" : "py-[104px]";
  const badgeSize = Math.min(360, width * 0.8);
  const wisp1Style = wispInterpolate(wisp1Anim);
  const wisp2Style = wispInterpolate(wisp2Anim);
  const wisp3Style = wispInterpolate(wisp3Anim);

  return (
    <ScrollView className="flex-1 bg-noir">
      {/* HERO */}
      <View
        className="min-h-[92vh] items-center justify-center px-7 overflow-hidden"
        style={{
          backgroundColor: "#0c0a08",
          paddingTop: isMobile ? 100 : 80,
        }}
      >
        {/* BG gradients */}
        <View
          className="absolute inset-0"
          pointerEvents="none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 75% 20%, rgba(217,98,43,0.10), transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(201,162,75,0.08), transparent 50%)",
          } as any}
        />

        {/* Smoke wisps — HTML uses SVG circles with specific radii inside containers */}
        <Animated.View pointerEvents="none" className="absolute" style={[{ top: "8%", left: "6%", width: 260, height: 260 }, wisp1Style]}>
          <Svg width="100%" height="100%" viewBox="0 0 200 200">
            <Circle cx="100" cy="100" r="70" fill="#f2ead6" />
          </Svg>
        </Animated.View>
        <Animated.View pointerEvents="none" className="absolute" style={[{ top: "55%", right: "8%", width: 180, height: 180 }, wisp2Style]}>
          <Svg width="100%" height="100%" viewBox="0 0 200 200">
            <Circle cx="100" cy="100" r="60" fill="#c9a24b" />
          </Svg>
        </Animated.View>
        <Animated.View pointerEvents="none" className="absolute" style={[{ top: "20%", right: "22%", width: 120, height: 120 }, wisp3Style]}>
          <Svg width="100%" height="100%" viewBox="0 0 200 200">
            <Circle cx="100" cy="100" r="50" fill="#d9622b" />
          </Svg>
        </Animated.View>
        <View
          className={`w-full ${isMobile ? "items-center" : "flex-row items-center gap-10"}`}
          style={{ maxWidth: 1180 }}
        >
          <View className={isMobile ? "items-center" : "flex-1"}>
            <Text className="text-brass uppercase text-xs tracking-[3px] mb-[18px] font-jost">
              Tabacaria · Desde 2026 · Rio de Janeiro
            </Text>
            <Text className={`text-brass-light font-rye ${isMobile ? "text-5xl text-center" : "text-7xl"} mb-[18px]`}>
              Bem-vindo à{"\n"}SmokeBuzz
            </Text>
            <Text
              className={`text-cream-dim font-cormorant text-[21.6px] ${isMobile ? "text-center" : ""} leading-[1.5] mb-[34px]`}
              style={{ maxWidth: "46ch" as any }}
            >
              Charutos, tabacos e acessórios selecionados para quem aprecia cada baforada. Atendemos toda a cidade do Rio de Janeiro, com pedidos direto pelo Instagram.
            </Text>
            <View className={`flex-row gap-4 flex-wrap ${isMobile ? "justify-center" : ""}`}>
              <BrassButton label="Ver produtos" onPress={onNavigateProducts} />
              <BrassButton
                label="Pedir pelo Instagram"
                onPress={() => {}}
                variant="ghost"
              />
            </View>
          </View>
          <View className="items-center justify-center" style={{ width: badgeSize }}>
            <Animated.Image
              source={require("../../assets/logosmokebuzz-hero.png")}
              style={[
                {
                  width: badgeSize,
                  transform: [{ translateY: floatAnim }],
                },
                Platform.OS === "web"
                  ? ({ filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.55))" } as any)
                  : {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 25 },
                      shadowOpacity: 0.55,
                      shadowRadius: 45,
                      elevation: 25,
                    },
              ]}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <RopeDivider />

      {/* SOBRE */}
      <View className={`bg-espresso ${sectionPad} px-7`}>
        <View className="max-w-[1180px] mx-auto flex-row gap-[60px] items-center flex-wrap">
          <Image
            source={require("../../assets/logosmokebuzz-hero.png")}
            className="w-full rounded-[6px] border border-line"
            style={{ maxWidth: Math.min(280, width * 0.4) }}
          />
          <View className="flex-1 min-w-[250px]">
            <SectionHeading
              eyebrow="Nossa história"
              title="Uma tabacaria de bairro, com curadoria de verdade"
              description="A SmokeBuzz nasceu para ser aquele lugar de confiança: um balcão onde você encontra do charuto ao isqueiro certo, e alguém que entende do assunto para te ajudar a escolher. Sem pressa, sem enrolação — só o que há de bom para quem gosta de fumar bem."
            />
            <View className="flex-row gap-[42px] mt-9 flex-wrap">
              <View className="items-center">
                <Text className="text-brass-light font-rye text-[30.4px]">2026</Text>
                <Text className="text-cream-dim font-jost text-xs uppercase tracking-[0.5px]">
                  Ano de fundação
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-brass-light font-rye text-[30.4px]">6+</Text>
                <Text className="text-cream-dim font-jost text-xs uppercase tracking-[0.5px]">
                  Categorias de produtos
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-brass-light font-rye text-[30.4px]">100%</Text>
                <Text className="text-cream-dim font-jost text-xs uppercase tracking-[0.5px]">
                  Atendimento presencial
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <RopeDivider />

      {/* DIFERENCIAIS */}
      <View className={`bg-espresso ${sectionPad} px-7`}>
        <View className="max-w-[1180px] mx-auto">
          <SectionHeading
            eyebrow="Por que a SmokeBuzz"
            title="O que nos diferencia"
          />
          <View className={`gap-10 ${isMobile ? "" : "flex-row"}`}>
            {diferenciais.map((item, i) => (
              <View key={i} className="flex-1">
                <Text className="text-ember font-rye text-[17.6px]">
                  {item.label}
                </Text>
                <Text className="text-brass-light font-rye text-[20.8px] mt-[10px] mb-3">
                  {item.title}
                </Text>
                <Text className="text-cream-dim font-cormorant text-[17.6px] leading-[1.5]">
                  {item.desc}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <RopeDivider />

      {/* LOCALIZAÇÃO */}
      <View className={`${sectionPad} px-7`}>
        <View className="max-w-[1180px] mx-auto flex-row gap-[50px] flex-wrap" style={{ alignItems: "flex-start" }}>
          <View className="flex-1 min-w-[280px]">
            <View style={{ marginBottom: 30 }}>
              <SectionHeading
                eyebrow="Onde entregamos"
                title="Área de atendimento"
              />
            </View>
            <View className="mb-[30px]">
              <Text className="text-brass-light font-rye text-[16.8px] mb-[10px] tracking-[0.4px]">
                Cobertura
              </Text>
              <Text className="text-cream-dim font-cormorant text-[18.4px] leading-[1.6]">
                Atendemos toda a cidade do Rio de Janeiro.
                {"\n"}Sem loja física — pedidos feitos direto pelo Instagram.
              </Text>
            </View>
            <View className="mb-[30px]">
              <Text className="text-brass-light font-rye text-[16.8px] mb-[10px] tracking-[0.4px]">
                Horário de atendimento
              </Text>
              <Text className="text-cream-dim font-cormorant text-[18.4px] leading-[1.6]">
                Segunda a sábado: 10h às 20h
                {"\n"}Domingo: 12h às 18h
                {"\n"}
                <Text className="text-cream-dim font-cormorant text-[15.2px] italic">
                  (ajuste para o seu horário real)
                </Text>
              </Text>
            </View>
            <View className="mb-[30px]">
              <Text className="text-brass-light font-rye text-[16.8px] mb-[10px] tracking-[0.4px]">
                Contato
              </Text>
              <Text className="text-cream-dim font-cormorant text-[18.4px] leading-[1.6]">
                Instagram: @smokebuzztabacaria
                {"\n"}E-mail: contato@smokebuzz.com.br
              </Text>
            </View>
          </View>
          <View className="flex-1 min-w-[280px] border border-line rounded-lg bg-espresso-2 items-center justify-center text-center p-[30px]" style={{ aspectRatio: 4/3 }}>
            <Text className="text-cream-dim font-cormorant text-[16.8px] text-center">
              Toda a cidade do Rio de Janeiro
            </Text>
            <Text className="text-cream-dim font-cormorant text-[15.2px] italic text-center mt-2">
              Confirme a área e o prazo de entrega do seu bairro direto no Direct
            </Text>
          </View>
        </View>
      </View>

      <RopeDivider />

      {/* CONTATO */}
      <View className={`bg-espresso ${sectionPad} px-7 items-center`}>
        <View className="max-w-[1180px] mx-auto items-center">
          <View className="max-w-[600px] mb-11 items-center">
            <SectionHeading
              eyebrow="Fale com a gente"
              title="Pronto para o seu próximo charuto?"
              description="Manda uma mensagem no Direct e a gente te ajuda a escolher — entregamos em toda a cidade do Rio de Janeiro."
            />
          </View>
          <View className="flex-row gap-[18px] flex-wrap justify-center">
            <BrassButton label="Chamar no Direct" onPress={() => {}} />
            <BrassButton
              label="Enviar e-mail"
              onPress={() => {}}
              variant="ghost"
            />
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View className="bg-noir pt-11 pb-[30px] px-7 border-t border-line">
        <View className="max-w-[1180px] mx-auto">
          <View className="flex-row justify-between items-center flex-wrap gap-5">
            <View className="flex-row items-center gap-3">
              <Image
                source={require("../../assets/logosmokebuzz-transparent.png")}
                className="w-9 h-9 rounded-full"
              />
              <View>
                <Text className="text-cream font-rye text-base">
                  SmokeBuzz Tabacaria
                </Text>
                <Text className="text-cream-dim font-jost text-xs tracking-[0.3px]">
                  Since 2026
                </Text>
              </View>
            </View>
            <View className="flex-row gap-[22px]">
              <Text className="text-cream font-jost text-sm">Produtos</Text>
              <Text className="text-cream font-jost text-sm">Sobre</Text>
              <Text className="text-cream font-jost text-sm">Localização</Text>
              <Text className="text-cream font-jost text-sm">Contato</Text>
            </View>
          </View>
          <Text className="text-cream-dim font-jost text-xs text-center opacity-70 mt-[26px] tracking-[0.3px]">
            Venda destinada exclusivamente a maiores de 18 anos. © 2026 SmokeBuzz Tabacaria. Todos os direitos reservados.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
