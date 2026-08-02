import { useEffect, useState } from "react";
import { AccessibilityInfo, Platform } from "react-native";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    Platform.OS === "web"
      ? typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    if (Platform.OS === "web") {
      if (typeof window === "undefined") return;
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mql.matches);
      const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }

    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduced(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (enabled) => setReduced(enabled)
    );
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return reduced;
}
