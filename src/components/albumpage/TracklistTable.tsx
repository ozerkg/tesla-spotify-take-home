import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { TbDots } from "react-icons/tb";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import { SimplifiedTrack, Track, Episode } from "@spotify/web-api-ts-sdk";
import { useCheckIfTrackIsSaved } from "../../apis/tracks/useTracks";

dayjs.extend(duration);

type TrackListItem = Track | Episode | SimplifiedTrack;

interface TrackListTableProps {
  tracks: TrackListItem[];
}

const msToMinSec = (ms: number) => {
  const dur = dayjs.duration(ms);
  return dur.minutes() + ":" + dur.seconds().toString().padStart(2, "0");
};

const TrackListTable = ({ tracks }: TrackListTableProps) => {
  const newTracks = tracks.filter((track) => track !== null);

  const { data: savedTracksStatus } = useCheckIfTrackIsSaved(
    newTracks.map((track) => track?.id).slice(0, 20),
    !!newTracks
  );

  return (
    <div className="px-6 py-4">
      <table className="w-full text-white text-sm">
        <thead>
          <tr className="text-neutral-400 text-xs uppercase border-b border-neutral-800">
            <th className="pb-4 text-left font-normal">#</th>
            <th className="pb-4 text-left font-normal">Song</th>
            <th className="pb-4 text-left font-normal">Plays</th>
            <th className="text-right font-normal w-12"></th>
            <th className="pb-4 text-left font-normal w-16">Time</th>
            <th className="text-right font-normal w-10"></th>
          </tr>
        </thead>
        <tbody>
          {newTracks.map((track, index) => {
            const random = (
              Math.floor(Math.random() * (2_000_000 - 100_000 + 1)) + 100_000
            ).toLocaleString();
            if (!track) return null;
            return (
              <tr key={track.id} className="hover:bg-neutral-900 group">
                <td className="py-3">{index + 1}</td>
                <td className="py-3">{track.name ? track.name : ""}</td>
                <td className="py-3">{random}</td>
                <td className="text-right">
                  {savedTracksStatus && savedTracksStatus[index] ? (
                    <IoMdHeart className="text-green-500 cursor-pointer transition-colors" />
                  ) : (
                    <IoMdHeartEmpty className="text-neutral-400 hover:text-white cursor-pointer transition-colors" />
                  )}
                </td>
                <td>{msToMinSec(track.duration_ms)}</td>
                <td className="text-right">
                  <TbDots />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrackListTable;
