import { useNavigate } from "react-router-dom";

import { useUser } from "@/hooks/useUser";
import { useStats } from "@/hooks/useStats";
import { Button } from "@/components/ui/button";

function GoogleDriveButton() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const scope = encodeURIComponent(
    "https://www.googleapis.com/auth/drive.file",
  );

  const handleClick = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  return <Button onClick={handleClick}>Google Drive 연결</Button>;
}

export default function Home() {
  const user = useUser();
  const navigate = useNavigate();
  const { data: stats } = useStats(user!.id);

  return (
    <div className="flex gap-1">
      {stats?.map(({ id, name }) => (
        <Button
          key={id}
          variant="outline"
          onClick={() => navigate(`/stat/${id}`)}
        >
          {name}
        </Button>
      ))}
      <GoogleDriveButton />
    </div>
  );
}
