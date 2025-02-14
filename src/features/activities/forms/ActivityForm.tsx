import {
  Button,
  Card,
  CardContent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

const StyledTextField = styled(TextField)(() => ({
  marginBottom: 8,
  width: "100%",
}));

interface Props {
  activity: Activity | undefined;
  submitting: boolean;
  closeForm: () => void;
  handleEditOrCreateActivity: (activity: Activity) => void
}

const ActivityForm = ({ activity : editActivity, submitting, handleEditOrCreateActivity, closeForm }: Props) => {
  
  const initialState: Activity = {
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: ""
  }

  const [activity, setActivity] = useState<Activity>(editActivity || initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    // spread operator (triple dot)
    setActivity({...activity,  [name] : value });
  }

  const handleSubmit = () => {
    handleEditOrCreateActivity(activity);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
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
          <Button variant="contained" loading={submitting}
          onClick={handleSubmit}>Submit</Button>
          &nbsp;
          <Button variant="outlined" onClick={closeForm}>
            Cancel
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
