import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { rootRouter } from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={rootRouter} />
      <Toaster />
    </HelmetProvider>
  </StrictMode>,
);
