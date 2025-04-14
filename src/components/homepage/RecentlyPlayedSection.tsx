import { IoChevronForward } from "react-icons/io5";
import HorizontalScrollContainer from "../HorizontalScrollContainer";
import Card from "../Card";
import { useRecentlyPlayedTracks } from "../../apis/tracks/useTracks";

const RecentlyPlayedSection = () => {
  const {
    data: recentlyPlayedTracks,
    isPending,
    error,
  } = useRecentlyPlayedTracks();

  if (isPending) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error fetching recently played tracks</>;
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
              onClick={() => console.log("card clicked")}
              key={item.track.id}
            />
          );
        })}
        <div></div>
      </HorizontalScrollContainer>
    </>
  );
};

export default RecentlyPlayedSection;
