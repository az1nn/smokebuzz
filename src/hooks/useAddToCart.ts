import { useCallback } from "react";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

export function useAddToCart() {
  const { addItem } = useCart();

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      addItem(product, quantity);
    },
    [addItem]
  );

  return { addToCart };
}