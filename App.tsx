import "../global.css";
import React from "react";
import { Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900 p-4">
      <Text className="text-3xl font-bold text-sky-400 mb-2 text-center">
        Meu App PWA
      </Text>
      <Text className="text-slate-300 text-center mb-6">
        React Native + Expo + TypeScript + Tailwind CSS
      </Text>

      <Pressable className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 px-6 py-3 rounded-xl shadow-lg">
        <Text className="text-white font-semibold text-lg">
          Clique Aqui
        </Text>
      </Pressable>

      <StatusBar style="light" />
    </View>
  );
}
