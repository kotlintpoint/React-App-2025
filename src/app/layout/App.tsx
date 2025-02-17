import { useEffect } from "react";
import NavBar from "./NavBar";
import { fetchActivities } from "../stores/activitySlice";
import { useAppDispatch } from "../stores/hooks";
import { Outlet } from "react-router-dom";

function App() {
 
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActivities());
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
