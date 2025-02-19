import { useState } from 'react'
import ActivityCard from './ActivityCard'
import { Activity } from '../../../app/models/activity'
import { Container } from '@mui/material'
import { useAppSelector } from '../../../app/stores/hooks'
import { RootState } from '../../../app/stores/store'


const ActivityList = () => {
  const [deleteActivityId, setDeleteActivityId] = useState<string>("");
  const handleActivityDeleteId = (id: string) => {
    setDeleteActivityId(id);
  }
  const activityState = useAppSelector((state: RootState) => state.activity)
  const { activities } = activityState;
  // const activitiesByDate = Array.from(activities.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const activitiesByDate = [...activities].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  return (
    <Container>   
    {
        activitiesByDate.map((activity : Activity) => (
            <ActivityCard key={activity.id} 
                        activity={activity} 
                        deleteActivityId={deleteActivityId}
                        handleActivityDeleteId={handleActivityDeleteId} />
        ))
    }
    </Container>
  )
}

export default ActivityList
