import { useParams, useLocation } from "react-router-dom";
import AlbumHeroSection from "../components/albumpage/AlbumHeroSection";
import TrackListTable from "../components/albumpage/TracklistTable";
import AlbumActionButtons from "../components/albumpage/AlbumActionButtons";
import {
  useAlbumById,
  usePlaylistById,
  useUserSavedTracks,
} from "../apis/index";

const getMediaType = (
  pathname: string
): "album" | "playlist" | "collection" | null => {
  if (pathname.startsWith("/album/")) return "album";
  if (pathname.startsWith("/playlist/")) return "playlist";
  if (pathname.startsWith("/collection/tracks")) return "collection";
  return null;
};

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const mediaType = getMediaType(location.pathname);
  const formattedDuration = "45 min 23 sec";

  const { data: albumData } = useAlbumById(
    id ?? "",
    !!id && mediaType === "album"
  );
  const { data: playlistData } = usePlaylistById(
    id ?? "",
    !!id && mediaType === "playlist"
  );
  const { data: collectioData } = useUserSavedTracks();

  return (
    <div className="relative h-[300px] text-white">
      {albumData && mediaType === "album" && (
        <>
          <AlbumHeroSection
            imageUrl={albumData.images[0].url}
            title={albumData.name}
            artistName={albumData.artists[0].name}
            releaseDate={albumData.release_date.slice(0, 4)}
            totalTracks={albumData.total_tracks}
            duration={formattedDuration}
          />
          <AlbumActionButtons />
          <TrackListTable tracks={albumData.tracks.items} />
        </>
      )}

      {playlistData && mediaType === "playlist" && (
        <>
          <AlbumHeroSection
            imageUrl={playlistData.images[0].url}
            title={playlistData.name}
            artistName={playlistData.owner.display_name}
            totalTracks={playlistData.tracks.total}
            duration={formattedDuration}
          />
          <AlbumActionButtons />
          <TrackListTable
            tracks={playlistData.tracks.items.map((item) => item.track)}
          />
        </>
      )}

      {collectioData && mediaType === "collection" && (
        <>
          <AlbumHeroSection
            imageUrl={"https://misc.scdn.co/liked-songs/liked-songs-640.jpg"}
            title={"Liked Songs"}
            artistName={"Ozer K"}
            totalTracks={1800}
            duration={formattedDuration}
          />
          <AlbumActionButtons collection={true} />
          <TrackListTable tracks={collectioData} />
        </>
      )}
    </div>
  );
};

export default AlbumPage;
