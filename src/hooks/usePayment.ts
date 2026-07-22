import { useState, useCallback } from "react";

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const processPayment = useCallback(
    async (amount: number): Promise<{ success: boolean }> => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (Math.random() > 0.1) {
          return { success: true };
        } else {
          throw new Error("Payment declined");
        }
      } catch (e) {
        setError(e as Error);
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { processPayment, loading, error };
}