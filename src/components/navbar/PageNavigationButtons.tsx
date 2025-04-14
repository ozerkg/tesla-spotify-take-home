import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import SpotifyButton from "../SpotifyButton";

const PageNavigationButtons = () => {
  const handleBack = () => {
    window.history.back();
  };

  const handleForward = () => {
    window.history.forward();
  };

  return (
    <div className="flex flex-row space-between px-4 py-4">
      <SpotifyButton
        variant="secondary"
        aria-label="Go back"
        className="w-[40px] h-[30px]"
        onClick={handleBack}
      >
        <IoChevronBack />
      </SpotifyButton>
      <SpotifyButton
        variant="secondary"
        aria-label="Go forward"
        className="w-[40px] h-[30px]"
        onClick={handleForward}
      >
        <IoChevronForward />
      </SpotifyButton>
    </div>
  );
};

export default PageNavigationButtons;
