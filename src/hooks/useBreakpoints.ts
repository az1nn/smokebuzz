import { useWindowDimensions } from "react-native";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export interface Breakpoints {
  bp: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useBreakpoints(): Breakpoints {
  const { width } = useWindowDimensions();
  const isMobile = width <= 560;
  const isTablet = width <= 900;
  const isDesktop = width > 900;
  const bp: Breakpoint = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
  return { bp, isMobile, isTablet, isDesktop };
}

export const prodCols = (isDesktop: boolean): number => (isDesktop ? 4 : 2);
export const catCols = (isDesktop: boolean, isMobile: boolean): number =>
  isDesktop ? 3 : isMobile ? 1 : 2;
export const difCols = (isDesktop: boolean): number => (isDesktop ? 3 : 1);
