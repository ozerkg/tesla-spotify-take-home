import { CiUser } from "react-icons/ci";
import SpotifyButton from "../SpotifyButton";

interface ProfileButton {
  imgUrl: string | undefined;
}

const ProfileButton = ({ imgUrl }: ProfileButton) => {
  return (
    <div className="ml-auto flex items-center gap-4">
      <SpotifyButton variant="secondary" rounded>
        {imgUrl ? (
          <>
            <img
              src={imgUrl}
              alt="Profile Picture"
              className="rounded-full size-[24px]"
            />
          </>
        ) : (
          <div className="flex flex-row items-center">
            <CiUser size={24} />
          </div>
        )}
      </SpotifyButton>
    </div>
  );
};

export default ProfileButton;
