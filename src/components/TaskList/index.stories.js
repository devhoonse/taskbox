import React from "react";
import TaskList from "./index";
import * as TaskStories from "../Task/index.stories";

export default {
  component: TaskList,
  title: 'TaskList',
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
Default.args = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ]
};

/**
 * story 2
 * @type {any}
 */
export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  tasks: [
    ...Default.args.tasks.slice(0, 5),
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6 (Pinned)', state: 'TASK_PINNED' },
  ]
};

/**
 * story 3
 * @type {any}
 */
export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true
};

/**
 * story 4
 * @type {any}
 */
export const Empty = Template.bind({});
Empty.args = {
  ...Loading.args,
  loading: false
};
