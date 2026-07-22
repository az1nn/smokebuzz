import { useCallback } from "react";

export function useNavigation() {
  const goToCart = useCallback(() => {
    // Navigation handled by App.tsx via callbacks
  }, []);

  const goToCheckout = useCallback(() => {
    // Navigation handled by App.tsx via callbacks
  }, []);

  const goToProducts = useCallback(() => {
    // Navigation handled by App.tsx via callbacks
  }, []);

  const goBack = useCallback(() => {
    // Navigation handled by App.tsx via callbacks
  }, []);

  return {
    goToCart,
    goToCheckout,
    goToProducts,
    goBack,
  };
}