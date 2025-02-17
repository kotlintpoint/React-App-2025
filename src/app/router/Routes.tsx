import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";


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
      ]
    },
   
]);

export default router;