import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";



const root = createRoot(document.getElementById("root")); // Use createRoot instead of ReactDOM.render
root.render(
  <React.StrictMode>
  <Provider store={store}>
        <App />
  </Provider>
  </React.StrictMode>
);

reportWebVitals();


