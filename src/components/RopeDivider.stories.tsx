import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import RopeDivider from "./RopeDivider";

const meta = {
  title: "Components/RopeDivider",
  component: RopeDivider,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <View className="w-full px-6 py-8">
        <Story />
      </View>
    ),
  ],
} as Meta<typeof RopeDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { thin: false },
};

export const Thin: Story = {
  args: { thin: true },
};
