import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonCard } from "./SkeletonCard";
import type { CardType } from "./Card";

const meta: Meta<typeof SkeletonCard> = {
  title: "Components/SkeletonCard",
  component: SkeletonCard,
  argTypes: {
    type: {
      control: "select",
      options: ["album", "playlist", "artist", "category"] satisfies CardType[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonCard>;

const createStory = (type: CardType): Story => ({
  args: { type },
});

export const Album = createStory("album");
export const Playlist = createStory("playlist");
export const Artist = createStory("artist");
export const Category = createStory("category");
