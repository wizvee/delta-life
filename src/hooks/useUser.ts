import { useContext } from "react";
import { SupabaseContext } from "@/contexts/SupabaseContext";

export function useUser() {
  const context = useContext(SupabaseContext);
  if (!context)
    throw new Error("useUser must be used within a SupabaseProvider");
  return context.session?.user ?? null;
}
