import React, { useState } from 'react'
import ActivityCard from './ActivityCard'
import { Activity } from '../../../app/models/activity'
import { Container } from '@mui/material'

interface Props {
    activities: Activity[],
    submitting: boolean,
    handleSelectedActivity: (id: string) => void,
    handleDeleteActivity: (id: string) => void
}

const ActivityList = ({activities, submitting, handleSelectedActivity, handleDeleteActivity}: Props) => {
  const [deleteActivityId, setDeleteActivityId] = useState<string>("");
  const handleActivityDeleteId = (id: string) => {
    setDeleteActivityId(id);
  }

  return (
    <Container>   
    {
        activities.map((activity : Activity) => (
            <ActivityCard key={activity.id} 
                        submitting={submitting}
                        activity={activity} 
                        handleSelectedActivity={handleSelectedActivity}
                        handleDeleteActivity={handleDeleteActivity}
                        deleteActivityId={deleteActivityId}
                        handleActivityDeleteId={handleActivityDeleteId} />
        ))
    }
    </Container>
  )
}

export default ActivityList
