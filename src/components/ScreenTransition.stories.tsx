import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ScreenTransition } from "./ScreenTransition";
import { Text, View } from "react-native";
import BrassButton from "./BrassButton";

const meta = {
  title: "Components/ScreenTransition",
  component: ScreenTransition,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ScreenTransition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <View className="flex-1 items-center justify-center bg-espresso p-8">
        <Text className="text-cream font-rye text-2xl">Screen Content</Text>
        <Text className="text-cream-dim font-jost mt-2">Content wrapped in ScreenTransition animates on mount</Text>
      </View>
    ),
  },
};

export const MultipleTransitions: Story = {
  render: function TransitionDemo() {
    const [screen, setScreen] = useState(0);

    return (
      <View className="bg-noir p-6 gap-4">
        <BrassButton
          label="Change screen"
          size="sm"
          onPress={() => setScreen((current) => current + 1)}
        />
        <ScreenTransition key={screen}>
          <View className="bg-espresso p-8">
            <Text className="text-cream font-rye text-xl">Screen {screen + 1}</Text>
            <Text className="text-cream-dim font-jost mt-2">
              Press the button to mount the next transition.
            </Text>
          </View>
        </ScreenTransition>
      </View>
    );
  },
  parameters: { layout: "centered" },
};
