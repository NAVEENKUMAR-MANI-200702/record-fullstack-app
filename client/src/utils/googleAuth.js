import { GOOGLE_CLIENT_ID } from "../static/Constant";

export const getGoogleAuthUrl = () => {
  const clientId = GOOGLE_CLIENT_ID;

  const redirectUri = "https://recordio-naveen.netlify.app/auth/callback";

  const scope = "openid email profile";

  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    `client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}` +
    `&access_type=offline` +
    `&prompt=consent`;

  return authUrl;
};


