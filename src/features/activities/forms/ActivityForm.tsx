import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Activity } from "../../../app/models/activity";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks";
import {
  activityDetails,
  createActivities,
  updateActivities,
} from "../../../app/stores/activitySlice";
import { RootState } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyDatePicker from "../../../app/common/form/MyDatePicker";

export const categoryOptions = [
  { text: "Drinks", value: "drinks" },
  { text: "Culture", value: "culture" },
  { text: "Film", value: "film" },
  { text: "Food", value: "food" },
  { text: "Music", value: "music" },
];

const ActivityForm = () => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Minimum length 2 required")
      .required("Required"),
    date: Yup.date().required("Required").nullable(),
    description: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    venue: Yup.string().required("Required"),
  });
  const initialState: Activity = {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  };
  const { loading, selectedActivity } = useAppSelector(
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

  const handleSubmit = async (activity: Activity) => {
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
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Formik
          enableReinitialize
          initialValues={activity}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ isSubmitting, dirty, isValid, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <MyTextInput name="title" label="Title" />
              <MyDatePicker name="date" label="Date" />
              <MyTextInput
                name="description"
                label="Description"
                multiline
                rows={3}
              />
              <MyTextInput
                name="category"
                label="Category"
                select
                options={categoryOptions}
              />
              <MyTextInput name="city" label="City" />
              <MyTextInput name="venue" label="Venue" />
              <Typography>
                <Button type="submit" variant="contained" disabled={isSubmitting || !isValid || !dirty}>
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
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
