import { generateRandomString, sha256, base64encode } from './pkce';

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_REDIRECT_TARGET;

export async function redirectToSpotifyLogin() {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  localStorage.setItem("code_verifier", codeVerifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id,
    redirect_uri,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    scope: "user-read-private user-read-email user-top-read user-library-read playlist-read-private playlist-read-collaborative user-read-recently-played user-follow-read user-follow-modify",
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}