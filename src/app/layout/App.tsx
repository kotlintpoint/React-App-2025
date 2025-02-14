import { useEffect, useState } from "react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingIndicator from "./LoadingIndicator";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    agent.Activities.list().then(response => {
      const activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  const handleSelectedActivity = (id: string) => {
    const activity = activities.find((item) => item.id === id);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(response => {
      setActivities([...activities.filter(item => item.id !== response.id)]);
      setSubmitting(false);
    })

  }

  const handleCancelActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = () => {
    setEditMode(true);
  };
  
  const handleFormClose = () => {
    setEditMode(false);
    setSelectedActivity(undefined);
  };

  const handleEditOrCreateActivity = (activity: Activity) => {
    setSubmitting(true);
    if(activity.id){
      // Edit
      // const filterActivities = activities.filter(item => item.id !== activity.id);
      // setActivities([activity, ...filterActivities]);
      // setSelectedActivity(activity);
      
      agent.Activities.update(activity).then(response => {
        response.date = response.date.split("T")[0];
        const index = activities.findIndex(item => item.id === response.id);
        const activitiesData = [...activities];
        activitiesData.splice(index, 1, response);
        setActivities(activitiesData);
        setSelectedActivity(response);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      // create
      // const newActivity:Activity = {...activity, id: uuid()};
      delete activity.id;
      // const {id, ...activityData} = activity;
      agent.Activities.create(activity).then(response => {
        response.date = response.date.split("T")[0];
        setActivities([response, ...activities])
        setEditMode(false);
        setSubmitting(false);
      })
    }
   
  }

  

  return (
    <div>
      <NavBar openForm={handleFormOpen} />
      {
        loading ? (
          <LoadingIndicator />
        ) : (
          <ActivityDashboard
                  activities={activities}
                  selectedActivity={selectedActivity}
                  editMode={editMode}
                  submitting={submitting}
                  handleSelectedActivity={handleSelectedActivity}
                  handleCancelActivity={handleCancelActivity}
                  openForm={handleFormOpen}
                  closeForm={handleFormClose}
                  handleEditOrCreateActivity={handleEditOrCreateActivity}
                  handleDeleteActivity={handleDeleteActivity}
          />
        )
      }
      
    </div>
  );
}

export default App;
