import { ReactNode, useCallback, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type AppPressableProps = {
  children: ReactNode;
  feedback?: "scale" | "dim";
  style?: StyleProp<ViewStyle>;
} & PressableProps;

export function AppPressable({
  children,
  feedback = "scale",
  style,
  ...rest
}: AppPressableProps) {
  const reduced = usePrefersReducedMotion();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    if (feedback === "dim") {
      Animated.timing(opacityAnim, {
        toValue: 0.85,
        duration: 120,
        useNativeDriver: Platform.OS !== "web",
      }).start();
      return;
    }
    if (reduced) return;
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      friction: 6,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [feedback, reduced, scaleAnim, opacityAnim]);

  const handlePressOut = useCallback(() => {
    if (feedback === "dim") {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: Platform.OS !== "web",
      }).start();
      return;
    }
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [feedback, scaleAnim, opacityAnim]);

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...rest}>
      <Animated.View
        style={[style, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}
