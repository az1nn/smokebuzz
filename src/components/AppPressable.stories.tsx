import type { Meta, StoryObj } from "@storybook/react";
import { View, Text } from "react-native";
import { AppPressable } from "./AppPressable";

const meta = {
  title: "Components/AppPressable",
  component: AppPressable,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    feedback: {
      control: "select",
      options: ["scale", "dim"],
    },
    onPress: { action: "pressed" },
  },
} as Meta<typeof AppPressable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    feedback: "scale",
    children: (
      <View className="bg-brass/20 p-4 rounded">
        <Text className="text-cream font-jost">Press Me</Text>
      </View>
    ),
  },
};

export const DimFeedback: Story = {
  args: {
    feedback: "dim",
    children: (
      <View className="bg-brass/30 p-4 rounded">
        <Text className="text-cream font-jost">Dim Press</Text>
      </View>
    ),
  },
};

export const Disabled: Story = {
  args: {
    feedback: "scale",
    disabled: true,
    children: (
      <View className="bg-brass/10 p-4 rounded opacity-50">
        <Text className="text-cream-dim font-jost">Unavailable</Text>
      </View>
    ),
  },
};
