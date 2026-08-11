import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import StickyHeader from "./StickyHeader";

const onNavPress = fn();

const meta = {
  title: "Components/StickyHeader",
  component: StickyHeader,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onNavPress: { action: "navigated" },
    scrolled: { control: "boolean" },
    activeSection: { control: "text" },
  },
} as Meta<typeof StickyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scrolled: false,
    onNavPress,
  },
};

export const Scrolled: Story = {
  args: {
    scrolled: true,
    onNavPress,
  },
};

export const ActiveSection: Story = {
  args: {
    activeSection: "categorias",
    onNavPress,
  },
};

export const MobileView: Story = {
  args: {
    scrolled: false,
    onNavPress,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    layout: "none",
  },
};
