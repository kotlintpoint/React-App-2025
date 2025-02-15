import React, { useState } from 'react'
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
  return (
    <Container>   
    {
        activities.map((activity : Activity) => (
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
