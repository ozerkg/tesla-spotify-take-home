import type { Meta, StoryObj } from "@storybook/react";
import { IoPlay } from "react-icons/io5";

import SpotifyButton from "./SpotifyButton";

const meta: Meta<typeof SpotifyButton> = {
  title: "Components/SpotifyButton",
  component: SpotifyButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "icon"],
    },
    rounded: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SpotifyButton>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Icon: Story = {
  args: {
    children: (
      <span>
        <IoPlay className="relative left-[2px] text-black text-xl" />
      </span>
    ),
    variant: "icon",
    rounded: true,
  },
};
