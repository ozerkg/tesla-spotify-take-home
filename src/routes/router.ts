// // routes/router.ts
// import { Router, createRouter } from "@tanstack/react-router";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { rootRoute } from "./rootRoute";

// import {
//   homeRoute,
//   browseRoute,
//   libraryRoute,
//   // libraryTabRoute,
//   // artistRoute,
//   albumRoute,
//   // playlistRoute,
//   // likedSongsRoute,
// } from "./appRoutes";
// // import { QueryClient } from "@tanstack/react-query";

// const routeTree = rootRoute.addChildren([
//   homeRoute,
//   browseRoute,
//   libraryRoute,
//   // libraryRoute.addChildren([
//   //   libraryTabRoute,
//   // ]),
//   // artistRoute,
//   albumRoute,
//   // playlistRoute,
//   // likedSongsRoute,
// ]);

// const queryClient = new QueryClient()

// export const router = createRouter({
//   routeTree,
//   context: {
//     queryClient,
//   },
//   defaultPreload: 'intent',
//   defaultPreloadStaleTime: 0,
//   scrollRestoration: true,
// });

// // Optionally: declare for types
// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }
