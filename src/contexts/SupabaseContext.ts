import { createContext } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

export interface SupabaseContextType {
  supabase: SupabaseClient;
  session: Session | null;
}

export const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined,
);
