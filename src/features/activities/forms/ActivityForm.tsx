import {
  Button,
  Card,
  CardContent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks";
import {
  activityDetails,
  createActivities,
  updateActivities,
} from "../../../app/stores/activitySlice";
import { RootState } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";

const StyledTextField = styled(TextField)(() => ({
  marginBottom: 8,
  width: "100%",
}));


const ActivityForm = () => {
  const initialState: Activity = {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  };
  const { loading, submitting, selectedActivity } = useAppSelector(
    (state: RootState) => state.activity
  );
  const dispatch = useAppDispatch();
  const [activity, setActivity] = useState<Activity>(initialState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(id){
      if(selectedActivity){
        setActivity(selectedActivity);
      }
      else{
        dispatch(activityDetails(id));
      }
    }
  }, [id, selectedActivity]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // spread operator (triple dot)
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = async () => {
    if (id) {
      const result = await dispatch(updateActivities(activity));
      if(result.payload){
        navigate(`/activities/${id}`);
      }
    } else {
      delete activity.id;
      const result = await dispatch(createActivities(activity));
      if(result.payload){
        navigate("/activities");
      }
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Card sx={{ maxWidth: 345,  margin: 2 }}>
      <CardContent>
        <StyledTextField
          label="Title"
          name="title"
          value={activity?.title}
          variant="outlined"
          onChange={handleChange}
        />
        <StyledTextField
          label="Date"
          type="date"
          name="date"
          value={activity?.date}
          variant="outlined"
          onChange={handleChange}
        />
        <StyledTextField
          label="Description"
          name="description"
          value={activity?.description}
          variant="outlined"
          onChange={handleChange}
        />
        <StyledTextField
          label="Category"
          name="category"
          value={activity?.category}
          variant="outlined"
          onChange={handleChange}
        />
        <StyledTextField
          label="City"
          name="city"
          value={activity?.city}
          variant="outlined"
          onChange={handleChange}
        />
        <StyledTextField
          label="Venue"
          name="venue"
          value={activity?.venue}
          variant="outlined"
          onChange={handleChange}
        />
        <Typography>
          <Button
            variant="contained"
            loading={submitting}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          &nbsp;
          <Button
            variant="outlined"
            component={Link}
            to={id ? `/activities/${id}` : "/activities"}
            // onClick={() => dispatch(handleFormClose())}
          >
            Cancel
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
