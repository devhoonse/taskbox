import { initialize, mswDecorator } from "msw-storybook-addon";
import '../src/index.css';

// initialize MSW
initialize();

/**
 * Provide the MSW addon decorator globally
 */
export const decorators = [mswDecorator];

/**
 * Configure storybook to log the actions in the UI/
 * @type {{controls: {matchers: {date: RegExp, color: RegExp}}, actions: {argTypesRegex: string}}}
 */
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
