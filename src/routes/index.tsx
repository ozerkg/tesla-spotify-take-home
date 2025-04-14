import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BrowsePage from "../pages/BrowsePage";
import LibraryPage from "../pages/LibraryPage";
import ArtistPage from "../pages/ArtistPage";
import LibraryTabContent from "../components/librarypage/LibraryTabContentV2";
import AlbumPage from "../pages/AlbumPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/browse" element={<BrowsePage />} />
    <Route path="/library" element={<LibraryPage />}>
      <Route index element={<Navigate to="playlists" replace />} />
      <Route path="playlists" element={<LibraryTabContent />} />
      <Route path="podcasts" element={<LibraryTabContent />} />
      <Route path="audiobooks" element={<LibraryTabContent />} />
      <Route path="artists" element={<LibraryTabContent />} />
      <Route path="albums" element={<LibraryTabContent />} />
    </Route>
    <Route path="/artist/:id" element={<ArtistPage />} />
    <Route path="/album/:id" element={<AlbumPage />} />
    <Route path="/playlist/:id" element={<AlbumPage />} />
    <Route path="/collection/tracks" element={<AlbumPage />} />
  </Routes>
);
