import type { Meta, StoryObj } from "@storybook/react";
import BrassButton from "./BrassButton";
import { View } from "react-native";
import { fn } from "@storybook/test";

const onPress = fn();

const meta = {
  title: "Components/BrassButton",
  component: BrassButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "ghost"],
    },
    size: {
      control: "select",
      options: ["md", "sm"],
    },
    onPress: { action: "pressed" },
    label: { control: "text" },
  },
} as Meta<typeof BrassButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
    variant: "solid",
    size: "md",
    onPress,
  },
};

export const Ghost: Story = {
  args: {
    label: "Ghost Button",
    variant: "ghost",
    size: "md",
    onPress,
  },
};

export const Small: Story = {
  args: {
    label: "Small",
    variant: "solid",
    size: "sm",
    onPress,
  },
};

export const AllVariants: Story = {
  render: () => {
    return (
      <View className="gap-4 items-center">
        <BrassButton label="Solid MD" variant="solid" size="md" onPress={onPress} />
        <BrassButton label="Ghost MD" variant="ghost" size="md" onPress={onPress} />
        <BrassButton label="Solid SM" variant="solid" size="sm" onPress={onPress} />
        <BrassButton label="Ghost SM" variant="ghost" size="sm" onPress={onPress} />
      </View>
    );
  },
  parameters: { layout: "centered" },
};
