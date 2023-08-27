import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts";
import { CarsPage } from "../pages";
import LoginPage from "../pages/LoginPage";
import { urls } from "../constants";
import { RegisterForm } from "../components";
import { CarDetailPage } from "../pages/CarDetailsPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={urls.auth.login} />,
      },
      {
        path: "cars",
        element: <CarsPage />,
        children: [
          {
            path: ":id",
            element: <CarDetailPage />,
          },
        ],
      },
      {
        path: urls.auth.login,
        element: <LoginPage />,
      },
      {
        path: urls.auth.register,
        element: <RegisterForm />,
      },
    ],
  },
]);

export { router };
