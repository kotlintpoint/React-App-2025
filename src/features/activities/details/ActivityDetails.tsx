import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Activity } from "../../../app/models/activity";
import Chip from "@mui/material/Chip";

interface Props {
  activity: Activity;
  handleCancelActivity: () => void;
  openForm: () => void;
}

const ActivityDetails = ({
  activity,
  handleCancelActivity,
  openForm,
}: Props) => {
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
        <Button variant="contained" onClick={openForm}>
          Edit
        </Button>
        &nbsp;
        <Button variant="outlined" onClick={handleCancelActivity}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityDetails;
