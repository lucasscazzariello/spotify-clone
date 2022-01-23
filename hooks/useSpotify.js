import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';
import { REFRESH_TOKEN_ERROR } from '../utils/constants';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLICA_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLICA_CLIENT_SECRET,
});

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh access token attempt fails, direct user to login...
      if (session.error === REFRESH_TOKEN_ERROR) {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;