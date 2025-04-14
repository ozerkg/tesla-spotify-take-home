import { IoChevronForward } from "react-icons/io5";
import HorizontalScrollContainer from "../HorizontalScrollContainer";
import Card, { CardType } from "../Card";
import { Album } from "@spotify/web-api-ts-sdk";
import { usePrefetchDetailPage } from "../../hooks/usePrefetchDetailPage";
import { useNavigate } from "react-router-dom";

interface ArtistAlbumsProps {
  data: Album[];
}

const ArtistAlbums = ({ data }: ArtistAlbumsProps) => {
  const navigate = useNavigate();
  const prefetchQuery = usePrefetchDetailPage();

  return (
    <div className="mt-8 mx-2">
      <div className="flex items-center cursor-pointer mx-2">
        <h3 className="text-xl font-semibold">Albums</h3>
        <span className="text-neutral-400 ml-4">
          <IoChevronForward />
        </span>
      </div>
      <HorizontalScrollContainer>
        {data.map((item) => {
          const albumYear = item.release_date?.split("-")[0] ?? "";
          return (
            <Card
              type={item.type as CardType}
              imageUrl={item.images[0].url ?? "/public/music_note.png"}
              title={item.name}
              subtitle={`${albumYear} * Album`}
              onClick={() => navigate(`/${item.type}/${item.id}`)}
              onMouseEnter={() => prefetchQuery(item.type, item.id)}
              onFocus={() => prefetchQuery(item.type, item.id)}
              onTouchStart={() => prefetchQuery(item.type, item.id)}
              key={item.id}
            />
          );
        })}
      </HorizontalScrollContainer>
    </div>
  );
};

export default ArtistAlbums;
