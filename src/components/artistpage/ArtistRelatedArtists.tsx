import { useNavigate } from "react-router-dom";
import HorizontalScrollContainer from "../HorizontalScrollContainer";
import Card from "../Card";
import { IoChevronForward } from "react-icons/io5";
import { MockArtist } from "../../types/artist";

interface ArtistRelatedArtistsProps {
  artist: MockArtist[];
}

const ArtistRelatedArtists = ({ artist }: ArtistRelatedArtistsProps) => {
  const navigate = useNavigate();

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
              onClick={() => navigate(`/artist/${item.id}`)}
              key={item.id}
            />
          );
        })}
      </HorizontalScrollContainer>
    </div>
  );
};

export default ArtistRelatedArtists;
