import type { Meta, StoryObj } from "@storybook/react";
import Container from "./Container";
import { View, Text } from "react-native";

const meta = {
  title: "Components/Container",
  component: Container,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    maxWidth: { control: { type: "number", min: 300, max: 1600 } },
    paddingX: { control: { type: "number", min: 0, max: 50 } },
  },
} as Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <View className="gap-4">
        <Text className="text-cream font-cormorant text-lg">Container content</Text>
        <Text className="text-cream-dim font-jost">Centered with default maxWidth 1180px</Text>
      </View>
    ),
  },
};

export const Narrow: Story = {
  args: {
    maxWidth: 800,
    children: (
      <View className="gap-4">
        <Text className="text-cream font-cormorant text-lg">Narrow Container</Text>
        <Text className="text-cream-dim font-jost">maxWidth 800px</Text>
      </View>
    ),
  },
};

export const Wide: Story = {
  args: {
    maxWidth: 1400,
    children: (
      <View className="gap-4">
        <Text className="text-cream font-cormorant text-lg">Wide Container</Text>
        <Text className="text-cream-dim font-jost">maxWidth 1400px allows more content width</Text>
      </View>
    ),
  },
};

export const CustomPadding: Story = {
  args: {
    paddingX: 16,
    children: (
      <View className="gap-4">
        <Text className="text-cream font-cormorant text-lg">Custom paddingX: 16px</Text>
        <Text className="text-cream-dim font-jost">Less gutter than default 28px</Text>
      </View>
    ),
  },
};

export const WithBackground: Story = {
  args: {
    className: "bg-espresso p-6",
    children: (
      <View className="gap-4">
        <Text className="text-cream font-cormorant text-lg">Container with custom children</Text>
        <Text className="text-cream-dim font-jost">Background and padding applied via className</Text>
      </View>
    ),
  },
};
