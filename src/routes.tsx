import { createBrowserRouter } from "react-router-dom";

import { DefaultLayout } from "./pages/_layout/default";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Transaction } from "./pages/transaction/transaction";
import { Category } from "./pages/category/category";
import { NotFound } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
      {
        path: "category",
        element: <Category />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
