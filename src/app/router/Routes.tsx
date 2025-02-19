import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerErrors from "../../features/errors/ServerErrors";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "",
            element: <HomePage />,
          },
          {
            path: "/activities",
            element: <ActivityDashboard />
          },
          {
            path: "/activities/:id",
            element: <ActivityDetails />
          },
          {
            path: "/create-activity",
            element: <ActivityForm key="create" />,
            
          },
          {
            path: "/manage-activity/:id",
            element: <ActivityForm key="create" />,
          },
          {
            path: "/test-error",
            element: <TestErrors />,
          },
          {
            path: "/not-found",
            element: <NotFound />,
          },
          {
            path: "/server-error",
            element: <ServerErrors />,
          },
          {
            path: "*",
            element: <Navigate replace to="/not-found" />
          }
      ]
    },
   
]);

export default router;