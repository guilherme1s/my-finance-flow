import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "./components/ui/theme/theme-provider";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "sonner";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="myfinanceflow.theme" defaultTheme="light">
        <Helmet titleTemplate="%s | MyFinanceFlow" />
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" richColors />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
