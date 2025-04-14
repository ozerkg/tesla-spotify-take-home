// import { createRoute } from "@tanstack/react-router";
// import { rootRoute } from "./rootRoute";

// import HomePage from "../pages/HomePage";
// import BrowsePage from "../pages/BrowsePage";
// import LibraryPage from "../pages/LibraryPage";
// import AlbumPage from "../pages/AlbumPage";
// import { getUserSavedAlbums } from "../apis/albums/albums";
// import { getBrowseCategories } from "../apis/browse/browse";
// // import ArtistPage from "../pages/ArtistPage";
// // import LibraryTabContent from "../components/librarypage/LibraryTabContentV2";


// export const homeRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/",
//   component: HomePage,
// });

// export const browseRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/browse",
//   component: BrowsePage,
//   loader: async () => {
//     getBrowseCategories()
//     // Optional: Prefetch something like categories here
//     // await queryClient.ensureQueryData({ ... });
//   },
// });

// export const libraryRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/library",
//   component: LibraryPage,
// });

// export const albumRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/album/$id',
//   // loader: () => getUserSavedAlbums(),
//   preload: true,
//   component: AlbumPage
// })
