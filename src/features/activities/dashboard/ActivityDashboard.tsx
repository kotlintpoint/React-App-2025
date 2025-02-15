import Grid from "@mui/material/Grid2";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";
import { useAppSelector } from "../../../app/stores/hooks";
import { RootState } from "../../../app/stores/store";


const ActivityDashboard = () => {
   const {selectedActivity, editMode} = useAppSelector((state: RootState) => state.activity)
 
  return (
    <Grid container spacing={2} sx={{ paddingTop: 2 }}>
      <Grid size={8}>
        <ActivityList
        />
      </Grid>
      <Grid size={4}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            
          />
        )}
        {editMode && (
          <ActivityForm activity={selectedActivity} />
        )}
      </Grid>
    </Grid>
  );
};

export default ActivityDashboard;
