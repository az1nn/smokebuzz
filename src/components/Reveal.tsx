import { ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: StyleProp<ViewStyle>;
};

export function Reveal({ children, delay = 0, y = 24, style }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const viewRef = useRef<React.ComponentRef<typeof Animated.View> | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(y)).current;
  const fired = useRef(false);

  useEffect(() => {
    if (reduced) return;

    const run = () => {
      if (fired.current) return;
      fired.current = true;
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: Platform.OS !== "web",
        }),
      ]).start();
    };

    if (Platform.OS === "web") {
      const node = viewRef.current as unknown as Element | null;
      if (!node || typeof IntersectionObserver === "undefined") {
        run();
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              run();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }

    const timer = setTimeout(run, delay);
    return () => clearTimeout(timer);
  }, [reduced, delay, opacity, translateY]);

  if (reduced) {
    return <Animated.View style={style}>{children}</Animated.View>;
  }

  return (
    <Animated.View
      ref={viewRef}
      style={[
        style,
        { opacity, transform: [{ translateY }], overflow: "visible" },
      ]}
    >
      {children}
    </Animated.View>
  );
}
