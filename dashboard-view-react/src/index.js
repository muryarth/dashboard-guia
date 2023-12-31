import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Estilos globais do bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// React Notification Component
import 'react-notifications-component/dist/theme.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
