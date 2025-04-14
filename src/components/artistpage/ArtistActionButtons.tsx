import { memo, useCallback, useMemo } from "react";
import { IoShuffleOutline, IoPlay } from "react-icons/io5";
import {
  useCheckIfFollowingArtist,
  useFollowArtist,
  useUnfollowArtist,
} from "../../apis/artists/useArtists";
import SpotifyButton from "../SpotifyButton";

interface ArtistActionButtonsProps {
  id: string;
}

const ArtistActionButtons = memo(({ id }: ArtistActionButtonsProps) => {
  const { data } = useCheckIfFollowingArtist([id]);
  const followMutation = useFollowArtist();
  const unfollowMutation = useUnfollowArtist();
  const isMutating = useMemo(
    () => followMutation.isPending || unfollowMutation.isPending,
    [followMutation.isPending, unfollowMutation.isPending]
  );

  const handleFollowClick = useCallback(() => {
    if (data === undefined) return;

    try {
      if (data[0] === true) {
        unfollowMutation.mutate(id);
      } else {
        followMutation.mutate(id);
      }
    } catch (error) {
      console.error("Failed to toggle follow state:", error);
    }
  }, [data, id, followMutation, unfollowMutation]);

  return (
    <div className="m-4 flex flex-row">
      <SpotifyButton
        variant="primary"
        rounded
        className="hover:scale-105 text-black w-[60px] h-[60px] min-w-[60px] shadow-lg flex items-center justify-center transition-transform"
      >
        <IoPlay size={34} className="relative left-[2px]" />
      </SpotifyButton>
      <SpotifyButton
        variant="secondary"
        className="p-4 w-[60px] h-[60px] text-neutral-200"
      >
        <IoShuffleOutline size={26} />
      </SpotifyButton>
      <SpotifyButton
        variant="secondary"
        className="w-[240px] h-[60px] text-neutral-200"
        onClick={handleFollowClick}
        disabled={isMutating}
      >
        {data && data[0] ? "Following" : "Follow"}
      </SpotifyButton>
      <SpotifyButton
        variant="secondary"
        className="w-[240px] h-[60px] text-neutral-200"
      >
        Play Artist Radio
      </SpotifyButton>
    </div>
  );
});

export default ArtistActionButtons;
