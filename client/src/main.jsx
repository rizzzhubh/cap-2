import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./context/StateProvider.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { initialState } from "./context/initialState.jsx";
import reducer from "./context/reducer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Router>,
  {/* </React.StrictMode> */}
);
