import { useParams } from "react-router-dom";
import relatedArtists from "../data/RelatedArtist.json";
import ArtisHeroSection from "../components/artistpage/ArtistHeroSection";
import ArtistActionButtons from "../components/artistpage/ArtistActionButtons";
import ArtistAlbums from "../components/artistpage/ArtistAlbums";
import ArtistRelatedArtists from "../components/artistpage/ArtistRelatedArtists";
import ArtistTopSongs from "../components/artistpage/ArtistTopSongs";
import {
  useArtistById,
  useArtistTopTracks,
  useArtistAlbums,
} from "../apis/index";

const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const artistId = id ?? "";

  const { data: artist } = useArtistById(artistId);
  const { data: artistTopTracks } = useArtistTopTracks(artistId);
  const { data: albums } = useArtistAlbums(artistId);

  if (!artist) return <div className="text-white">Loading artist...</div>;

  // TODO: render skelleton when loading for each cases.
  return (
    <div className="relative h-[300px] text-white">
      <ArtisHeroSection
        artistName={artist.name}
        imgUrl={artist.images[0].url}
      />
      <ArtistActionButtons id={artist.id} />

      {artistTopTracks === undefined || artistTopTracks.length === 0 ? (
        <p className="text-neutral-500">No top tracks available.</p>
      ) : (
        <ArtistTopSongs artistTopTracks={artistTopTracks} />
      )}

      {albums === undefined || albums.length === 0 ? (
        <p className="text-neutral-500">No top tracks available.</p>
      ) : (
        <ArtistAlbums data={albums} />
      )}

      {relatedArtists && <ArtistRelatedArtists artist={relatedArtists} />}
    </div>
  );
};

export default ArtistPage;
