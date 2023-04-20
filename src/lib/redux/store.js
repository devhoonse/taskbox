import { configureStore, createSlice } from "@reduxjs/toolkit";

const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

const initialState = {
  tasks: defaultTasks,
  status: 'idle',
  error: null,
};

const TaskSlice = createSlice({
  name: 'taskbox',
  initialState,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex >= 0) {
        state.tasks[taskIndex].state = newTaskState;
      }
    }
  }
});
export const { updateTaskState } = TaskSlice.actions;

const store = configureStore({
  reducer: {
    taskbox: TaskSlice.reducer
  }
});
export default store;
