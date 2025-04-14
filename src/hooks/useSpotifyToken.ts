import { useEffect, useState } from "react";
import { getToken } from "../apis/auth/token";

export const useSpotifyToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const storedToken = sessionStorage.getItem("spotify_access_token");

    const fetchToken = async () => {
      if (storedToken) {
        setToken(storedToken);
      } else if (code) {
        const accessToken = await getToken(code);
        sessionStorage.setItem("spotify_access_token", accessToken);
        setToken(accessToken);
        window.history.replaceState({}, document.title, "/");
      }
      setLoading(false);
    };

    fetchToken();
  }, []);

  return { token, loading };
}