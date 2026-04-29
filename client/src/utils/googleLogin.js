// import { getGoogleAuthUrl } from "./googleAuth";

import { getGoogleAuthUrl } from "./googleAuth";

export const openGoogleLogin = (callback) => {
  const popup = window.open(
    getGoogleAuthUrl(),
    "Google Login",
    "width=500,height=600",
  );

  const listener = (event) => {
    console.log("EVENT RECEIVED:", event);
    if (
      event.origin === window.location.origin &&
      event.data?.type === "GOOGLE_AUTH_SUCCESS"
    ) {
      callback(event.data.code);
      window.removeEventListener("message", listener);
      popup.close();
    }
  };

  window.addEventListener("message", listener);
};
