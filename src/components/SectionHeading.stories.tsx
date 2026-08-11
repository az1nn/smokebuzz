import type { Meta, StoryObj } from "@storybook/react";
import SectionHeading from "./SectionHeading";

const meta = {
  title: "Components/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    eyebrow: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
  },
} as Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Section Title",
  },
};

export const WithEyebrowAndDescription: Story = {
  args: {
    eyebrow: "FEATURED",
    title: "Section Heading with Eyebrow",
    description: "This is a longer description that appears beneath the title in smaller text.",
  },
};

export const Full: Story = {
  args: {
    eyebrow: "FEATURED",
    title: "Full Section Heading",
    description: "All three parts rendered: eyebrow, title, and description.",
  },
};
