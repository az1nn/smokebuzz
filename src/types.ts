import { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: ImageSourcePropType | string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Screen = "home" | "products" | "cart" | "checkout";
