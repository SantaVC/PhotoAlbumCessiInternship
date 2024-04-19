import "./index.scss";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeContextProvider>
);
