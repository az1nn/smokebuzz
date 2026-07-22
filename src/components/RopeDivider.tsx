import React from "react";
import { View } from "react-native";

export default function RopeDivider({ thin }: { thin?: boolean }) {
  return (
    <View
      className={thin ? "h-[4px]" : "h-[10px]"}
      style={{
        backgroundColor: "transparent",
        opacity: 0.55,
      }}
    >
      <View
        className="flex-1"
        style={{
          backgroundColor: "transparent",
          backgroundImage:
            "repeating-linear-gradient(115deg, #c9a24b 0px 6px, #2b1d12 6px 12px)",
        } as any}
      />
    </View>
  );
}
