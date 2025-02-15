import { useEffect } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingIndicator from "./LoadingIndicator";
import { RootState } from "../stores/store";
import { fetchActivities } from "../stores/activitySlice";
import { useAppDispatch, useAppSelector } from "../stores/hooks";

function App() {
  const { loading } = useAppSelector((state: RootState) => state.activity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActivities());
  }, []);

  return (
    <div>
      <NavBar />
      {loading ? <LoadingIndicator /> : <ActivityDashboard />}
    </div>
  );
}

export default App;
