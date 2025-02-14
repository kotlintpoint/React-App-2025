import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Activity } from "../../../app/models/activity";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  submitting: boolean;
  handleSelectedActivity: (id: string) => void;
  handleCancelActivity: () => void;
  openForm: () => void;
  closeForm: () => void;
  handleEditOrCreateActivity: (activity: Activity) => void
  handleDeleteActivity: (id: string) => void
}

const ActivityDashboard = (props: Props) => {
  const {
    activities,
    selectedActivity,
    editMode,
    submitting,
    handleSelectedActivity,
    handleCancelActivity,
    openForm,
    closeForm,
    handleEditOrCreateActivity,
    handleDeleteActivity
  } = props;
  return (
    <Grid container spacing={2} sx={{ paddingTop: 2 }}>
      <Grid size={8}>
        <ActivityList
          submitting={submitting}
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Grid>
      <Grid size={4}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            handleCancelActivity={handleCancelActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm activity={selectedActivity} 
          handleEditOrCreateActivity={handleEditOrCreateActivity}
          closeForm={closeForm}
          submitting={submitting} />
        )}
      </Grid>
    </Grid>
  );
};

export default ActivityDashboard;
