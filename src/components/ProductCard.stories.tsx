import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "./ProductCard";
import { fn } from "@storybook/test";
import { productAlt, products } from "../data/products";

const onAdd = fn();

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onAdd: { action: "added" },
    altText: { control: "text" },
  },
} as Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: products[0],
    onAdd,
  },
};

export const RealProduct: Story = {
  args: {
    product: products[1],
    onAdd,
  },
};

export const WithAltText: Story = {
  args: {
    product: products[0],
    altText: productAlt[products[0].id],
    onAdd,
  },
};
