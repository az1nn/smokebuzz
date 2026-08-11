import type { Meta, StoryObj } from "@storybook/react";
import { Reveal } from "./Reveal";
import { Text, View } from "react-native";

const meta = {
  title: "Components/Reveal",
  component: Reveal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    delay: { control: { type: "number", min: 0, max: 500 } },
    y: { control: { type: "number", min: 0, max: 48 } },
  },
} as Meta<typeof Reveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <View className="p-4 bg-espresso rounded">
        <Text className="text-cream font-cormorant">This content fades in on scroll</Text>
      </View>
    ),
  },
};

export const WithDelay: Story = {
  args: {
    delay: 100,
    children: (
      <View className="p-4 bg-espresso rounded">
        <Text className="text-cream font-cormorant">Delayed reveal (100ms)</Text>
      </View>
    ),
  },
};

export const ExtendedY: Story = {
  args: {
    y: 48,
    children: (
      <View className="p-4 bg-espresso rounded">
        <Text className="text-cream font-cormorant">Extended slide amount (y: 48)</Text>
      </View>
    ),
  },
};
