import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { createAppAsyncThunk } from "./hooks";

export interface ActivityState {
  loading: boolean;
  submitting: boolean;
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
}

const initialState: ActivityState = {
  loading: false,
  submitting: false,
  activities: [],
  selectedActivity: undefined,
  editMode: false,
};

export const fetchActivities = createAppAsyncThunk(
  "activities/list",
  async () => {
    return await agent.Activities.list();
  }
);

export const deleteActivities = createAppAsyncThunk(
  "activities/delete",
  async (id: string) =>{
    return await agent.Activities.delete(id);
  }
)

export const updateActivities = createAppAsyncThunk(
  "activities/update",
  async (activity: Activity) =>{
    return await agent.Activities.update(activity);
  }
)

export const createActivities = createAppAsyncThunk(
  "activities/create",
  async (activity: Activity) =>{
    return await agent.Activities.create(activity);
  }
)


export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    handleFormOpen: (state) => {
      state.editMode = true;
    },
    handleFormClose: (state) => {
      state.editMode = false;
      state.selectedActivity = undefined;
    },
    handleSelectedActivity: (state, action: PayloadAction<string>) => {
      state.selectedActivity = state.activities.find(
        (item) => item.id === action.payload
      );
    },
    handleCancelActivity: (state) => {
        state.selectedActivity = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchActivities.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchActivities.fulfilled, (state, action) => {
      state.activities = [];
      action.payload.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        state.activities.push(activity);
      });
      state.loading = false;
    })
    .addCase(deleteActivities.pending, (state) => {
      state.submitting = true;
    })
    .addCase(deleteActivities.fulfilled, (state, action) => {
      state.activities = [...state.activities.filter(item => item.id !== action.payload.id)];
      state.submitting = false;
    })
    .addCase(updateActivities.pending, (state) => {
      state.submitting = true;
    })
    .addCase(updateActivities.fulfilled, (state, action) => {
      action.payload.date = action.payload.date.split("T")[0];
      const index = state.activities.findIndex(item => item.id === action.payload.id);
      state.activities.splice(index, 1, action.payload);
      state.selectedActivity = action.payload;
      state.editMode = false;
      state.submitting = false;
    })
    .addCase(createActivities.pending, (state) => {
      state.submitting = true;
    })
    .addCase(createActivities.fulfilled, (state, action) => {
      action.payload.date = action.payload.date.split("T")[0];
      state.activities = [action.payload, ...state.activities]
      state.editMode = false;
      state.submitting = false;
    })
  },
});

export const { handleFormOpen, handleFormClose, handleSelectedActivity, handleCancelActivity } =
  activitySlice.actions;

export default activitySlice.reducer;
