import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Seda Zomo Branca",
    description: "Seda de arroz branca, combustão lenta",
    price: 3.0,
    image: require("./assets/seda_zomo_branca.png"),
    category: "Sedas",
  },
  {
    id: "2",
    name: "Seda Zomo Marrom Natural",
    description: "Seda natural marrom, sem cloro",
    price: 3.5,
    image: require("../assets/seda_zomo_marrom_natural.png"),
    category: "Sedas",
  },
  {
    id: "3",
    name: "Piteira Longa Girls in Green",
    description: "Piteira de vidro longa, design exclusivo",
    price: 10.0,
    image: require("../assets/piteira_longa_girls_in_green.png"),
    category: "Piteiras",
  },
  {
    id: "4",
    name: "Piteira Tradicional Papelito",
    description: "Piteira de papel tradicional, caixa c/ 50",
    price: 6.0,
    image: require("../assets/piteira_tradicional_papelito.png"),
    category: "Piteiras",
  },
];