import { NavLink } from "react-router-dom";

const LogoLink = () => {
  return (
    <NavLink to="/" className="self-center p-2 mx-2">
      <img src="/Spotify_icon.svg" alt="Spotify Icon" className="w-6 h-6" />
    </NavLink>
  );
};

export default LogoLink;
