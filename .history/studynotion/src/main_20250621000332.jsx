import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App"
import './index.css'
import { BrowserRouter } from "react-router-dom"

const store = configSo({

})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
    <BrowserRouter>
      <App  />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);