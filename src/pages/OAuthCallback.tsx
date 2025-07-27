import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (!code) {
        console.error("No code found in the URL");
        return;
      }

      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
          redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) {
        console.error("Failed to retrieve access token", tokenData);
        return;
      }

      if (!user) {
        console.error("User not found");
        return;
      }

      const { error } = await supabase.from("google_tokens").upsert({
        user_id: user.id,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: new Date(
          Date.now() + tokenData.expires_in * 1000,
        ).toISOString(),
      });
      if (error) {
        console.error("Error saving token to Supabase", error);
      } else {
        navigate("/");
      }
    };

    handleOAuthCallback();
  }, [user, navigate]);

  return <div></div>;
}
