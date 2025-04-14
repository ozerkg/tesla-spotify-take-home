import { redirectToSpotifyLogin } from "./apis/auth/login";
import { useSpotifyToken } from "./hooks/useSpotifyToken";
import { AppRoutes } from "./routes";
import Navbar from "./pages/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { token, loading } = useSpotifyToken();
  console.log("rendered");

  if (loading) return;

  if (!token)
    return (
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={redirectToSpotifyLogin}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Login with Spotify
        </button>
      </div>
    );

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;
