import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getWeekStart } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { useAuthSession } from "@/hooks/useAuthSession";
import CurrentTaskManager from "@/components/CurrentTaskManager";

export function ProtectedLayout() {
  const navigate = useNavigate();
  const { session, loading } = useAuthSession();

  useEffect(() => {
    if (!loading && !session) {
      navigate("/login", { replace: true });
    }
  }, [loading, session, navigate]);

  if (loading || !session) return null;

  const weekStart = getWeekStart();

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Toaster richColors position="top-center" />
      <CurrentTaskManager />
      <nav className="mb-8 flex items-center justify-center gap-2 rounded-md bg-neutral-100 p-1 text-sm font-semibold">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate(`/weekly/${weekStart}`)}>Weekly</button>
      </nav>
      <Outlet />
    </div>
  );
}
