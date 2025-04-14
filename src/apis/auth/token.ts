export const getToken = async (code: string): Promise<string> => {
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirect_uri = import.meta.env.VITE_REDIRECT_TARGET;
  const code_verifier = localStorage.getItem("code_verifier") || "";

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirect_uri,
    client_id: client_id,
    code_verifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();

  if (response.ok && data.access_token) {
    return data.access_token;
  } else {
    throw new Error(`Failed to get token: ${data.error_description || data.error}`);
  }
};
