import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import AddFlower from "../pages/AddFlower/AddFlower";
import DashboardLayout from "../components/layout/DashboardLayout";
import ManagerRoute from "../components/layout/ManagerRoute";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "addFlower",
        element: (
          <ManagerRoute role="manager">
            <AddFlower />
          </ManagerRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
