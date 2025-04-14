import { useState } from "react";
import Divider from "../components/Divider";
import Search from "../components/navbar/Search";
import PageNavigationButtons from "../components/navbar/PageNavigationButtons";
import NavLinks from "../components/navbar/NavLinks";
import ProfileButton from "../components/navbar/ProfileButton";
import LogoLink from "../components/navbar/LogoLink";
import { useCurrentUser } from "../apis/index";

const Navbar = () => {
  const { data } = useCurrentUser();
  const [searchExpanded, setSearchExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center h-16 px-4 relative">
        <div className="flex items-center lg:gap-4">
          <div className="hidden md:flex items-center">
            <Search expanded={searchExpanded} setExpanded={setSearchExpanded} />
            <Divider direction="vertical" />
          </div>
          {!searchExpanded && (
            <>
              <LogoLink />
              <div className="hidden md:flex items-center">
                <Divider direction="vertical" />
                <PageNavigationButtons />
                <Divider direction="vertical" />
              </div>
            </>
          )}
        </div>

        <NavLinks />
        <ProfileButton imgUrl={data?.images[0]?.url} />
      </div>
      <div className="sm:hidden px-4 py-2 border-t border-neutral-800 flex items-center gap-3">
        <Search mode="mobile" />
      </div>
    </div>
  );
};

export default Navbar;
