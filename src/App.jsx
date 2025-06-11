import { Button } from "@/components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing";
import Auth from "./pages/auth";
import Link from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import Dashboard from "./pages/dashboard";
import UrlProvider from "./context";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: <Link />,
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />;
    </UrlProvider>
  );
}

export default App;
