import { useCallback } from "react";
import { useCart } from "../context/CartContext";

export function useCartActions() {
  const { updateQuantity, removeItem, clearCart } = useCart();

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
    // Navigation handled by App.tsx via callbacks
  }, []);

  return {
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
    navigateToCheckout: handleCheckout,
  };
}