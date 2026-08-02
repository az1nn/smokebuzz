import { ReactNode, useEffect, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function ScreenTransition({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    if (reduced) return;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start();
  }, [reduced, opacity, translateY]);

  if (reduced) {
    return <Animated.View style={{ flex: 1 }}>{children}</Animated.View>;
  }

  return (
    <Animated.View style={{ flex: 1, opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}
