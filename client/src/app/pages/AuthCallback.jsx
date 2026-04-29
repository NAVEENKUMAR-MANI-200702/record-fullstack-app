// AuthCallback.jsx
import React ,{ useEffect }from "react";

const AuthCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("Callback loaded, code:", code);
     console.log("🔥 CALLBACK PAGE LOADED");

    if (code && window.opener) {
      window.opener.postMessage(
        {
          type: "GOOGLE_AUTH_SUCCESS",
          code,
        },
        "*"
      );

      window.close();
    }
  }, []);

  return <h1 style={{ color: "black" }}>Callback Working</h1>;
};

export default AuthCallback;