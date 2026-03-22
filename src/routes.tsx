import { createBrowserRouter } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { Transaction } from "./pages/transaction"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/transaction",
    element: <Transaction />,
  },
])
