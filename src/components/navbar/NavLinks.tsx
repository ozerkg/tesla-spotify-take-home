import { useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { getBrowseCategories } from "../../apis/browse/browse";
import { getUserPlaylists } from "../../apis/playlists/playlists";

const NavLinks = () => {
  const queryClient = useQueryClient();

  const links = [
    { label: "Home", path: "/" },
    {
      label: "Browse",
      path: "/browse",
      prefetch: () =>
        queryClient.prefetchQuery({
          queryKey: ["browseCategories"],
          queryFn: () => getBrowseCategories(),
          staleTime: 1000 * 60 * 10,
        }),
    },
    {
      label: "Library",
      path: "/library",
      prefetch: () =>
        queryClient.prefetchQuery({
          queryKey: ["userPlaylists"],
          queryFn: () => getUserPlaylists(20, 0),
          staleTime: 1000 * 60 * 10,
        }),
    },
  ];

  const renderedLinks = links.map(({ label, path, prefetch }) => {
    return (
      <NavLink
        key={label}
        to={path}
        onMouseEnter={prefetch}
        onFocus={prefetch}
        onTouchStart={prefetch}
        className={({ isActive }) =>
          `m-4 ${isActive ? "text-white font-bold" : "text-neutral-400"}`
        }
      >
        {label}
      </NavLink>
    );
  });

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex lg:gap-4">
      {renderedLinks}
    </div>
  );
};

export default NavLinks;
