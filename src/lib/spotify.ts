import dotenv from 'dotenv';
dotenv.config();

const SPOTIFY_CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = import.meta.env.SPOTIFY_REDIRECT_URI;

const basicAuth = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString('base64');

export const getAccessToken = async (code: string) => {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI!,
    }),
  });

  const data = await res.json();
  console.log('Response from Spotify API:', data);
  return data.access_token;
};

export const getTopTracks = async (accessToken: string, term: string) => {
  if (!accessToken) {
    throw new Error('Access token is required');
  }
  if (!term) {
    throw new Error('Search term is required');
  }
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=10&offset=49&time_range=${term}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  return data.items;
};
