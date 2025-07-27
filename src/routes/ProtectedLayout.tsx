import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/sonner";

export function ProtectedLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      navigate("/login", { replace: true });
    }
  }, [loading, session, navigate]);

  if (loading || !session) return null;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <Toaster position="top-center" />
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
