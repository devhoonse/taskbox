import React from "react";
import { Provider } from "react-redux";
import { rest } from "msw";
import { fireEvent, within, waitFor, waitForElementToBeRemoved } from "@storybook/testing-library";
import store from "../../lib/redux/store";
import { mockedState } from "../TaskList/index.stories";
import InboxScreen from "./index";

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [
    (story) => <Provider store={store}>{story()}</Provider>
  ]
};

/**
 * 컴포넌트 요소
 * @return {JSX.Element}
 * @constructor
 */
const Template = () => <InboxScreen/>;

/**
 * story 1
 * @type {any}
 */
export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get('https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, context) => {
        return res(context.json(mockedState.tasks));
      })
    ]
  }
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
  await waitFor(async () => {
    fireEvent.click(canvas.getByLabelText('pinTask-1'));
    fireEvent.click(canvas.getByLabelText('pinTask-3'));
  });
};

/**
 * story 2
 * @type {any}
 */
export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get('https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, context) => {
        return res(context.status(403));
      })
    ]
  }
};
