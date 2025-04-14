import { IoShuffleOutline, IoPlay } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { TbDots } from "react-icons/tb";
import SpotifyButton from "../SpotifyButton";

interface AlbumActionButtonsProps {
  collection?: boolean;
}

const AlbumActionButtons = ({
  collection = false,
}: AlbumActionButtonsProps) => {
  return (
    <div className="flex items-center px-6 py-4">
      <SpotifyButton
        variant="primary"
        rounded
        className="hover:scale-105 text-black text-2xl w-[40px] h-[40px] min-w-[40px] shadow-lg flex items-center justify-center transition-transform"
      >
        <IoPlay className="relative left-[1px]" />
      </SpotifyButton>
      {!collection && (
        <>
          <SpotifyButton
            variant="secondary"
            className="text-white text-2xl cursor-pointer "
          >
            <IoShuffleOutline />
          </SpotifyButton>
          <SpotifyButton
            variant="secondary"
            className="text-white text-2xl cursor-pointer"
          >
            <IoMdHeartEmpty />
          </SpotifyButton>
          <SpotifyButton variant="secondary">
            <TbDots className="text-white text-2xl cursor-pointer" />
          </SpotifyButton>
        </>
      )}
    </div>
  );
};

export default AlbumActionButtons;
