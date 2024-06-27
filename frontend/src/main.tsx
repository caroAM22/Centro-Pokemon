import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App"

import "./styles/styles.scss";
// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <App/>
  </React.StrictMode>
);
