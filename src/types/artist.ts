export interface MockArtist {
  id: string;
  uri: string;
  profile: {
    name: string;
  };
  visuals: {
    avatarImage: {
      sources: {
        height: number;
        width: number;
        url: string;
      }[];
    };
  };
}