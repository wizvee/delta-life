import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthSession } from "@/hooks/useAuthSession";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/sonner";
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

  return (
    <div className="mx-auto max-w-3xl p-4">
      <Toaster position="top-center" />
      <CurrentTaskManager />
      <nav className="mb-3 p-1">
        <Breadcrumb>
          <BreadcrumbList className="text-xs text-neutral-400">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <Outlet />
    </div>
  );
}
