import { useNavigate } from "react-router-dom";

import { useUser } from "@/hooks/useUser";
import { useStats } from "@/hooks/useStats";
import { Button } from "@/components/ui/button";

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
    </div>
  );
}
