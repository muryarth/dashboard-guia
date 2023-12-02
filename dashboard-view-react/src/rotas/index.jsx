import React from "react";
import ReactDOM from "react-dom/client";

// Router
import { createBrowserRouter } from "react-router-dom";

// Componentes sendo importados na rota
import Home from "../telas/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/customers",
    element: <Home />,
  },
  // {
  //   path: "/customers/add",
  //   element: <Home />,
  // },
]);

export default router;
