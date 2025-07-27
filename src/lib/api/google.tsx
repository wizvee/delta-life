import { supabase } from "../supabase";

export async function getValidAccessToken(userId: string): Promise<string> {
  const { data: tokenRow, error } = await supabase
    .from("google_tokens")
    .select("access_token, refresh_token, expires_at")
    .eq("user_id", userId)
    .single();

  if (error || !tokenRow) throw new Error("Google 연동 정보 없음");

  const now = new Date();
  const expiresAt = new Date(tokenRow.expires_at);

  if (now < expiresAt) {
    return tokenRow.access_token;
  }

  // 만료되었을 경우 재발급
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
      refresh_token: tokenRow.refresh_token,
      grant_type: "refresh_token",
    }),
  });

  const newToken = await res.json();
  if (!newToken.access_token) throw new Error("access_token 재발급 실패");

  // Supabase 갱신
  await supabase
    .from("google_tokens")
    .update({
      access_token: newToken.access_token,
      expires_at: new Date(
        Date.now() + newToken.expires_in * 1000,
      ).toISOString(),
    })
    .eq("user_id", userId);

  return newToken.access_token;
}

export async function createGoogleDriveFolder(
  accessToken: string,
  folderName: string,
): Promise<string> {
  const response = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      // parents: ["상위폴더ID"],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error creating folder: ${data.error?.message || "Unknown error"}`,
    );
  }

  return data.id;
}

export async function uploadFileToDrive(
  accessToken: string,
  folderId: string,
  file: File,
): Promise<void> {
  const metadata = {
    name: file.name,
    parents: [folderId],
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" }),
  );
  form.append("file", file);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    },
  );

  const result = await res.json();
  if (!res.ok) {
    console.error("업로드 실패:", result);
    throw new Error(result.error?.message || "Google Drive 업로드 실패");
  }
}
