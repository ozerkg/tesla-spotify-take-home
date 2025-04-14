import { useNavigate } from "react-router-dom";
import HorizontalScrollContainer from "../HorizontalScrollContainer";
import Card from "../Card";
import { IoChevronForward } from "react-icons/io5";
import { MockArtist } from "../../types/artist";
import { useQueryClient } from "@tanstack/react-query";
import { getArtistById } from "../../apis/artists/artists";

interface ArtistRelatedArtistsProps {
  artist: MockArtist[];
}

const ArtistRelatedArtists = ({ artist }: ArtistRelatedArtistsProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handlePrefetch = (artistId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["artist", artistId],
      queryFn: () => getArtistById(artistId),
    });
  };

  return (
    <div className="mt-8 mx-2">
      <div className="flex items-center cursor-pointer mx-2">
        <h3 className="text-xl font-semibold">Fans also like</h3>
        <span className="text-neutral-400 ml-4">
          <IoChevronForward />
        </span>
      </div>
      <HorizontalScrollContainer>
        {artist.map((item) => {
          return (
            <Card
              type={"artist"}
              imageUrl={item.visuals.avatarImage.sources[2].url}
              title={item.profile.name}
              subtitle={`Artist`}
              key={item.id}
              onClick={() => navigate(`/artist/${item.id}`)}
              onMouseEnter={() => handlePrefetch(item.id)}
              onFocus={() => handlePrefetch(item.id)}
              onTouchStart={() => handlePrefetch(item.id)}
            />
          );
        })}
      </HorizontalScrollContainer>
    </div>
  );
};

export default ArtistRelatedArtists;
