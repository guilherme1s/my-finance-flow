import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { ThemeProvider } from "./components/theme-provider"
import { Helmet, HelmetProvider } from "react-helmet-async"

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="myfinanceflow.theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | MyFinanceFlow" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
