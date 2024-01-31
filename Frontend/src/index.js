import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LoadingBarProvider } from "./context/LoadingBarContext";
import '@fortawesome/fontawesome-free/css/all.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoadingBarProvider>
      <App />
    </LoadingBarProvider>
  </React.StrictMode>
);
