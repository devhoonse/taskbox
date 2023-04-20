import React from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import TaskList from "./index";
import * as TaskStories from "../Task/index.stories";

/**
 * Task 목록 가상 데이터입니다.
 * @type {[{[p: string]: *},{[p: string]: *},{[p: string]: *},{[p: string]: *},{[p: string]: *},null]}
 */
export const mockedState = {
  status: 'idle',
  error: null,
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ]
};

const MockStore = ({ taskboxState, children }) => (
  <Provider store={configureStore({
    reducer: {
      taskbox: createSlice({
        name: 'taskbox',
        initialState: taskboxState,
        reducers: {
          updateTaskState: (state, action) => {
            const { id, newTaskState } = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === id);
            if (taskIndex >= 0) {
              state.tasks[taskIndex].state = newTaskState;
            }
          }
        }
      }).reducer
    }
  })}>
    {children}
  </Provider>
);

export default {
  component: TaskList,
  title: 'TaskList',
  excludeStories: /.*mockedState$/,
  decorators: [
    (story) => <div style={{ padding: '3rem' }}>{story()}</div>
  ]
};

/**
 * 컴포넌트 요소
 * @param args
 * @return {JSX.Element}
 * @constructor
 */
const Template = (args) => <TaskList {...args} />;

/**
 * story 1
 * @type {any}
 */
export const Default = Template.bind({});
Default.decorators = [
  (story) => <MockStore taskboxState={mockedState}>{story()}</MockStore>
];

/**
 * story 2
 * @type {any}
 */
export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  (story) => {
    const pinnedTasks = [
      ...mockedState.tasks.slice(0, 5),
      { ...TaskStories.Default.args.task, id: '6', title: 'Task 6 (Pinned)', state: 'TASK_PINNED' },
    ];
    return (
      <MockStore taskboxState={{ ...mockedState, tasks: pinnedTasks }}>
        {story()}
      </MockStore>
    );
  }
];

/**
 * story 3
 * @type {any}
 */
export const Loading = Template.bind({});
Loading.decorators = [
  (story) => (
    <MockStore taskboxState={{ ...mockedState, status: 'loading' }}>
      {story()}
    </MockStore>
  )
];

/**
 * story 4
 * @type {any}
 */
export const Empty = Template.bind({});
Empty.decorators = [
  (story) => (
    <MockStore taskboxState={{ ...mockedState, tasks: [] }}>
      {story()}
    </MockStore>
  )
];
