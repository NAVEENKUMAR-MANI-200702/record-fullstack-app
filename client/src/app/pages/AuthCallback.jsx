import React, { useEffect } from "react";

const AuthCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    console.log("🔥 CALLBACK PAGE LOADED");
    console.log("Code:", code);
    console.log("Error:", error);

    if (error) {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "GOOGLE_AUTH_ERROR",
            error,
          },
          "*",
        );
        window.close();
      } else {
        window.location.href = `/login?error=${error}`;
      }
      return;
    }

    if (code) {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "GOOGLE_AUTH_SUCCESS",
            code,
          },
          "*",
        );
        window.close();
      }
      else {
        window.location.href = `/login?code=${code}`;
      }
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Signing you in with Google...</h2>
    </div>
  );
};

export default AuthCallback;
