import { IoChevronForward } from "react-icons/io5";
import HorizontalScrollContainer from "../HorizontalScrollContainer";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { useUserPlaylists } from "../../apis/playlists/usePlaylists";
import { useQueryClient } from "@tanstack/react-query";
import { getPlaylistById } from "../../apis/playlists/playlists";

const PlaylistsSection = () => {
  const navigate = useNavigate();
  const queryClint = useQueryClient();

  const { data: userPlaylist, isPending, error } = useUserPlaylists();

  if (isPending) {
    return <>Loading..</>;
  }

  if (error || userPlaylist.length === 0) {
    return;
  }

  const handlePrefetch = (playlistId: string) => {
    queryClint.prefetchQuery({
      queryKey: ["playlist", playlistId],
      queryFn: () => getPlaylistById(playlistId),
      staleTime: 1000 * 60 * 5,
    });
  };

  return (
    <>
      <div className="flex items-center cursor-pointer">
        <h2 className="px-2 font-bold">Your Playlists</h2>
        <span className="text-neutral-400 ml-2">
          <IoChevronForward />
        </span>
      </div>
      <HorizontalScrollContainer>
        {userPlaylist.map((item) => {
          return (
            <Card
              type={"album"}
              imageUrl={item?.images?.[0]?.url ?? "/public/music_note.png"}
              title={item.name}
              subtitle={item.description}
              onClick={() => navigate(`/playlist/${item.id}`)}
              key={item.id}
              onMouseEnter={() => handlePrefetch(item.id)}
              onFocus={() => handlePrefetch(item.id)}
              onTouchStart={() => handlePrefetch(item.id)}
            />
          );
        })}
      </HorizontalScrollContainer>
    </>
  );
};

export default PlaylistsSection;
