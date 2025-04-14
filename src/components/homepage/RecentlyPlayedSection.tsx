import { IoChevronForward } from "react-icons/io5";
import HorizontalScrollContainer from "../HorizontalScrollContainer";
import Card from "../Card";
import { useRecentlyPlayedTracks } from "../../apis/tracks/useTracks";
import { useNavigate } from "react-router-dom";
import { usePrefetchDetailPage } from "../../hooks/usePrefetchDetailPage";

const RecentlyPlayedSection = () => {
  const {
    data: recentlyPlayedTracks,
    isPending,
    error,
  } = useRecentlyPlayedTracks();

  const navigate = useNavigate();
  const prefetchQuery = usePrefetchDetailPage();

  if (isPending) {
    return <>Loading...</>;
  }

  if (error || recentlyPlayedTracks.length === 0) {
    return;
  }

  return (
    <>
      <div className="flex items-center cursor-pointer">
        <h2 className="px-2 font-bold">Recently Played</h2>
        <span className="text-neutral-400 ml-2">
          <IoChevronForward />
        </span>
      </div>
      <HorizontalScrollContainer>
        {recentlyPlayedTracks.map((item) => {
          return (
            <Card
              type={"album"}
              imageUrl={
                item.track.album.images[0].url ?? "/public/music_note.png"
              }
              title={item.track.name}
              subtitle={item.track.album.name}
              onClick={() => navigate(`album/${item.track.album.id}`)}
              onMouseEnter={() => prefetchQuery("album", item.track.album.id)}
              onFocus={() => prefetchQuery("album", item.track.album.id)}
              onTouchStart={() => prefetchQuery("album", item.track.album.id)}
              key={item.track.id}
            />
          );
        })}
      </HorizontalScrollContainer>
    </>
  );
};

export default RecentlyPlayedSection;
