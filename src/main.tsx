import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import { SupabaseProvider } from "./contexts/SupabaseContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SupabaseProvider>
    </QueryClientProvider>
  </StrictMode>,
);
