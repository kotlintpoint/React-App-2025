import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Activity } from "../../../app/models/activity";
import Chip from "@mui/material/Chip";
import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks";
import {
  deleteActivities,
  handleSelectedActivity,
} from "../../../app/stores/activitySlice";
import { RootState } from "../../../app/stores/store";
import { Link } from "react-router-dom";

interface Props {
  activity: Activity;
  deleteActivityId: string;
  handleActivityDeleteId: (id: string) => void;
}

export default function ActivityCard({
  activity,
  deleteActivityId,
  handleActivityDeleteId,
}: Props) {
  const { submitting } = useAppSelector((state: RootState) => state.activity);
  const dispatch = useAppDispatch();
  return (
    <Card sx={{ marginBottom: 2 }}>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="img.jpg"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {activity.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {activity.date}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {activity.venue}, {activity.city}
        </Typography>
        <Chip label={activity.category} variant="outlined" />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "right" }}>
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          size="small"
          variant="contained"
          // onClick={() => dispatch(handleSelectedActivity(activity.id || ""))}
        >
          View
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          loading={submitting && deleteActivityId === activity.id}
          onClick={() => {
            handleActivityDeleteId(activity.id || "");
            dispatch(deleteActivities(activity.id || ""));
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
