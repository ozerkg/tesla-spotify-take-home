import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import { Track } from "@spotify/web-api-ts-sdk";
import { useSaveTrack, useUnsaveTrack } from "../../apis";

interface ArtistTopTracksListProps {
  artistTopTracks: Track[];
  savedTracksStatus: boolean[] | undefined;
}

const ArtistTopTracksList = ({
  artistTopTracks,
  savedTracksStatus,
}: ArtistTopTracksListProps) => {
  const saveTrack = useSaveTrack();
  const unsaveTrack = useUnsaveTrack();

  return (
    <div className="w-full md:w-2/3">
      <div className="flex items-center mb-8 cursor-pointer">
        <h3 className="text-xl font-semibold">Top Songs</h3>
        <span className="text-neutral-400 ml-4">
          <IoChevronForward />
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
        {artistTopTracks.slice(0, 6).map((track, i) => {
          const isSaved = savedTracksStatus?.[i];

          return (
            <div key={track.id} className="flex items-center gap-4">
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{track.name}</p>
              </div>
              {isSaved ? (
                <IoMdHeart
                  className="text-green-500 cursor-pointer transition-colors"
                  onClick={() => unsaveTrack.mutate(track.id)}
                />
              ) : (
                <IoMdHeartEmpty
                  className="text-neutral-400 hover:text-white cursor-pointer transition-colors"
                  onClick={() => saveTrack.mutate(track.id)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistTopTracksList;
