import { IoChevronForward } from "react-icons/io5";
import HorizontalScrollContainer from "../HorizontalScrollContainer";
import Card from "../Card";
import { useTopTracks } from "../../apis/tracks/useTracks";
import { SkeletonCard } from "../SkeletonCard";
import { useNavigate } from "react-router-dom";
import { usePrefetchDetailPage } from "../../hooks/usePrefetchDetailPage";

const TopTracksSection = () => {
  const { data: topTracks, isPending, error } = useTopTracks();
  const navigate = useNavigate();
  const prefetchQuery = usePrefetchDetailPage();

  if (error) {
    return <div>Error loading tracks</div>;
  }

  return (
    <>
      <div className="flex items-center cursor-pointer">
        <h2 className="px-2 font-bold">Your Top Tracks</h2>
        <span className="text-neutral-400 ml-2">
          <IoChevronForward />
        </span>
      </div>
      <HorizontalScrollContainer>
        {isPending
          ? Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} type="album" />
            ))
          : topTracks.map((track) => {
              return (
                <Card
                  type={"album"}
                  imageUrl={track.album.images[0].url ?? "/music_note.png"}
                  title={track.name}
                  subtitle={track.artists[0].name}
                  onClick={() => navigate(`/album/${track.album.id}`)}
                  onMouseEnter={() => prefetchQuery("album", track.album.id)}
                  onFocus={() => prefetchQuery("album", track.album.id)}
                  onTouchStart={() => prefetchQuery("album", track.album.id)}
                  key={track.id}
                />
              );
            })}
      </HorizontalScrollContainer>
    </>
  );
};

export default TopTracksSection;
