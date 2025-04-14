import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "album",
        "playlist",
        "artist",
        "song",
        "category",
        "audiobook",
        "show",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const baseArgs = {
  imageUrl: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
  title: "The Title",
  subtitle: "The Subtitle",
};

export const Album: Story = {
  args: {
    ...baseArgs,
    type: "album",
  },
};

export const Playlist: Story = {
  args: {
    ...baseArgs,
    type: "playlist",
  },
};

export const Artist: Story = {
  args: {
    ...baseArgs,
    type: "artist",
  },
};

export const Song: Story = {
  args: {
    ...baseArgs,
    type: "song",
  },
};

export const Category: Story = {
  args: {
    ...baseArgs,
    type: "category",
  },
};
