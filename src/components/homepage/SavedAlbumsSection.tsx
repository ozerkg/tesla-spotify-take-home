import { IoChevronForward } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import { getAlbumById } from "../../apis/albums/albums";
import HorizontalScrollContainer from "../HorizontalScrollContainer";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { useUserSavedAlbums } from "../../apis/albums/useAlbums";
import { SkeletonCard } from "../SkeletonCard";

const SavedAlbumsSection = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userAlbums, isPending, error } = useUserSavedAlbums();

  const handlePrefetch = (albumId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["album", albumId],
      queryFn: () => getAlbumById(albumId),
      staleTime: 1000 * 60 * 5,
    });
  };

  if (error) {
    return <>Error loading albums</>;
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
        {isPending
          ? Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} type="album" />
            ))
          : userAlbums.map((item) => {
              const albumYear = item.album.release_date?.split("-")[0] ?? "";
              return (
                <Card
                  type={"album"}
                  key={item.album.id}
                  imageUrl={
                    item.album.images[0].url ?? "/public/music_note.png"
                  }
                  title={item.album.name}
                  subtitle={`${albumYear} * Album`}
                  onClick={() => navigate(`/album/${item.album.id}`)}
                  onMouseEnter={() => handlePrefetch(item.album.id)}
                  onFocus={() => handlePrefetch(item.album.id)}
                  onTouchStart={() => handlePrefetch(item.album.id)}
                />
              );
            })}
      </HorizontalScrollContainer>
    </>
  );
};

export default SavedAlbumsSection;
