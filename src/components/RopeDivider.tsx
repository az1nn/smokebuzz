import React from "react";
import { View, Platform } from "react-native";

const ROPE_COLOR = "#c9a24b";
const ROPE_BG = "#2b1d12";
const ROPE_OPACITY = 0.55;

function RopeLine({ thin }: { thin?: boolean }) {
  if (Platform.OS === "web") {
    return (
      <View
        className={thin ? "h-[4px]" : "h-[10px]"}
        style={{ opacity: ROPE_OPACITY }}
      >
        <View
          className="flex-1"
          style={{
            backgroundImage: `repeating-linear-gradient(115deg, ${ROPE_COLOR} 0px 6px, ${ROPE_BG} 6px 12px)`,
          } as any}
        />
      </View>
    );
  }

  const count = thin ? 8 : 20;
  return (
    <View
      className={thin ? "h-[4px]" : "h-[10px]"}
      style={{ opacity: ROPE_OPACITY, flexDirection: "row", overflow: "hidden" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            width: `${100 / count}%`,
            backgroundColor: i % 2 === 0 ? ROPE_COLOR : ROPE_BG,
          }}
        />
      ))}
    </View>
  );
}

export default function RopeDivider({ thin }: { thin?: boolean }) {
  return <RopeLine thin={thin} />;
}
