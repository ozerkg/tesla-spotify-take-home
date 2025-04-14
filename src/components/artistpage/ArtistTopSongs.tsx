import { Track } from "@spotify/web-api-ts-sdk";
import { useCheckIfTrackIsSaved } from "../../apis/tracks/useTracks";
import ArtistPick from "./ArtistPick";
import ArtistTopTracksList from "./ArtistTopTracksList";
interface ArtistTopSongsProps {
  artistTopTracks: Track[];
}

const ArtistTopSongs = ({ artistTopTracks }: ArtistTopSongsProps) => {
  const { data: savedTracksStatus } = useCheckIfTrackIsSaved(
    artistTopTracks.map((track) => track.id)
  );

  return (
    <div className="flex flex-col flex-col-reverse md:flex-row gap-12 text-white mt-8 mx-4">
      <ArtistPick
        imgUrl={artistTopTracks[0].album.images[0].url}
        artistName={artistTopTracks[0].artists[0].name}
        trackName={artistTopTracks[0].name}
      />
      <ArtistTopTracksList
        artistTopTracks={artistTopTracks}
        savedTracksStatus={savedTracksStatus}
      />
    </div>
  );
};

export default ArtistTopSongs;
