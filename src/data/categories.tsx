import Svg, { Path, Rect, Circle } from "react-native-svg";

export const categorias = [
  { title: "Charutos", description: "Linha selecionada de charutos nacionais e importados, para todos os paladares." },
  { title: "Cigarros", description: "Principais marcas do mercado, sempre com estoque em dia." },
  { title: "Sedas & Piteiras", description: "Sedas de diversas marcas e piteiras em vidro, metal e madeira." },
  { title: "Tabacos", description: "Tabacos soltos e para cachimbo, com origem e curas variadas." },
  { title: "Acessórios para fumo", description: "Cortadores, cinzeiros, humidores e tudo que compõe o ritual." },
  { title: "Isqueiros", description: "Do básico ao colecionável — sempre um isqueiro à altura do momento." },
];

export function renderIcon(title: string) {
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
