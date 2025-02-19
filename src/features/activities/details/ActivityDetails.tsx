import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks";
import { activityDetails, handleCancelActivity } from "../../../app/stores/activitySlice";
import { RootState } from "../../../app/stores/store";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";
import { format} from "date-fns";

const ActivityDetails = () => {
  const { id } = useParams();
  // const [activity, setActivity] = useState<Activity | null>(null);
  const { loading, selectedActivity: activity } = useAppSelector(
    (state: RootState) => state.activity
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(handleCancelActivity());
    }
  },[]);

  useEffect(() => {
    if (id && !activity) {
      dispatch(activityDetails(id));
    }
  }, [id, activity]);

  if (loading || !activity) {
    return <LoadingIndicator />;
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      {/* <CardMedia sx={{ height: 140 }} image="img.jpg" title="green iguana" /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {activity.title}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {format(activity.date!, "dd MMM yyyy")}
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
        <Button
          variant="contained"
          component={Link}
          to={`/manage-activity/${activity.id}`}
          // onClick={() => dispatch(handleFormOpen())}
        >
          Edit
        </Button>
        &nbsp;
        <Button
          variant="outlined"
          component={Link}
          to="/activities"
          // onClick={() => dispatch(handleCancelActivity())}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityDetails;
