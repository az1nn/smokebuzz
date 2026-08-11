import type { Meta, StoryObj } from "@storybook/react";
import CategoryCard from "./CategoryCard";
import { View } from "react-native";
import { categorias, renderIcon } from "../data/categories";

const [charutos, cigarros, sedas] = categorias;

const meta = {
  title: "Components/CategoryCard",
  component: CategoryCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
} as Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...charutos,
    icon: renderIcon(charutos.title),
  },
};

export const Cigarros: Story = {
  args: {
    ...cigarros,
    icon: renderIcon(cigarros.title),
  },
};

export const SedasPiteiras: Story = {
  args: {
    ...sedas,
    icon: renderIcon(sedas.title),
  },
};

export const FullGrid: Story = {
  render: () => (
    <View className="flex-wrap flex-row gap-4" style={{ maxWidth: 500 }}>
      {categorias.map((category) => (
        <CategoryCard
          key={category.title}
          {...category}
          icon={renderIcon(category.title)}
        />
      ))}
    </View>
  ),
  parameters: { layout: "centered" },
};
