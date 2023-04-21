import { Provider } from "react-redux";
import store from "./lib/redux/store";
import InboxScreen from "./components/InboxScreen";
import './index.css'

/**
 *
 * @constructor
 */
export default function App() {
  /*
    컴포넌트 구조
   */
  return (
    <Provider store={store}>
      <InboxScreen/>
    </Provider>
  );
}
