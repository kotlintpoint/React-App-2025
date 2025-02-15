import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks";
import { handleCancelActivity, handleFormOpen } from "../../../app/stores/activitySlice";
import { RootState } from "../../../app/stores/store";


const ActivityDetails = () => {
  const {selectedActivity : activity} = useAppSelector((state: RootState) => state.activity)
  const dispatch = useAppDispatch();
  
  if(!activity)
  {
    return <></>
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia sx={{ height: 140 }} image="img.jpg" title="green iguana" /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {activity.title}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {activity.date}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {activity.venue}, {activity.city}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {activity.description}
        </Typography>
        <Chip label={activity.category} variant="outlined" />
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={() => dispatch(handleFormOpen())}>
          Edit
        </Button>
        &nbsp;
        <Button variant="outlined" onClick={() => dispatch(handleCancelActivity())}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityDetails;
