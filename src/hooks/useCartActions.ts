import { useCallback } from "react";
import { useCart } from "../context/CartContext";
import { useNavigation } from "./useNavigation";

export function useCartActions() {
  const { updateQuantity, removeItem, clearCart } = useCart();
  const { goToCheckout } = useNavigation();

  const handleUpdateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
      } else {
        updateQuantity(productId, quantity);
      }
    },
    [updateQuantity, removeItem]
  );

  const handleRemoveItem = useCallback(
    (productId: string) => {
      removeItem(productId);
    },
    [removeItem]
  );

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  const handleCheckout = useCallback(() => {
    goToCheckout();
  }, [goToCheckout]);

  return {
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
    navigateToCheckout: handleCheckout,
  };
}