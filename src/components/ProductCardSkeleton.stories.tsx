import type { Meta, StoryObj } from "@storybook/react";
import ProductCardSkeleton from "./ProductCardSkeleton";

const meta = {
  title: "Components/ProductCardSkeleton",
  component: ProductCardSkeleton,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ProductCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
