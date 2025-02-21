import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import { fetchActivities } from "../stores/activitySlice";
import { useAppDispatch } from "../stores/hooks";
import HomePage from "../../features/home/HomePage";

function App() {
 
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchActivities());
  }, []);

  
  return (
    <>
      <ToastContainer position="top-right" />
      {
        (location.pathname === "/") ? <HomePage /> : (
          <>
            <NavBar />
            <Outlet />
          </>
        )
      }
    </>
  );
}

export default App;
