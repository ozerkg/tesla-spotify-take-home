import {
  Playlist,
  Show,
  Audiobook,
  Artist,
  Album,
  SavedAlbum
} from "@spotify/web-api-ts-sdk";

type SpotifyLibraryItem = Playlist | Show | Audiobook | Artist | Album | SavedAlbum;

export type NormalizedItem = {
  id: string;
  title: string;
  imageUrl: string;
  type: string;
};


export const normalizeItem = (item: SpotifyLibraryItem): NormalizedItem => {
  if ("album" in item) {
    return {
      id: item.album.id,
      title: item.album.name,
      imageUrl: item.album.images?.[0]?.url ?? "/music_note.png",
      type: item.album.type,
    };
  }


  if ("show" in item) {
    // Episode
    return {
      id: item.id,
      title: item.name,
      imageUrl: item.images?.[0]?.url ?? "/music_note.png",
      type: "episode",
    };
  }

  // Playlist, Artist, Album, etc.
  return {
    id: item.id,
    title: item.name,
    imageUrl: item.images?.[0]?.url ?? "/music_note.png",
    type: item.type,
  };
}
