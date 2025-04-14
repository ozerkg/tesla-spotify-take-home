import type { Meta, StoryObj } from "@storybook/react";
import HorizontalScrollContainer from "./HorizontalScrollContainer";

const meta: Meta<typeof HorizontalScrollContainer> = {
  title: "Components/HorizontalScrollContainer",
  component: HorizontalScrollContainer,
  argTypes: {
    snap: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof HorizontalScrollContainer>;

const MockBox = ({ color }: { color: string }) => (
  <div
    className="w-40 h-24 rounded-md flex items-center justify-center text-white font-bold"
    style={{ backgroundColor: color }}
  >
    Box
  </div>
);

const sampleColors = [
  "#1DB954",
  "#FF5C58",
  "#3C3C3C",
  "#0099FF",
  "#FFC857",
  "#1DB954",
  "#FF5C58",
  "#3C3C3C",
  "#0099FF",
  "#FFC857",
  "#1DB954",
  "#FF5C58",
  "#3C3C3C",
  "#0099FF",
  "#FFC857",
  "#1DB954",
  "#FF5C58",
  "#3C3C3C",
  "#0099FF",
  "#FFC857",
];

export const Default: Story = {
  args: {
    snap: true,
    children: sampleColors.map((color, i) => <MockBox key={i} color={color} />),
  },
};
