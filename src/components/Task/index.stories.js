import React from "react";
import Task from "./index";

export default {
  component: Task,
  title: 'Task'
};

/**
 * 컴포넌트 요소
 * @param args
 * @return {JSX.Element}
 * @constructor
 */
const Template = (args) => <Task {...args} />;

/**
 * story 1
 * @type {any}
 */
export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX'
  }
};

/**
 * story 2
 * @type {any}
 */
export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED'
  }
};

/**
 * story 3
 * @type {any}
 */
export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED'
  }
};
