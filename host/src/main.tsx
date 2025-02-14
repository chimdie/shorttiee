import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { rootRouter } from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <RouterProvider router={rootRouter} />
        <Toaster />
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
);
