import React from "react";

// Router
import { createBrowserRouter } from "react-router-dom";

// Componentes sendo importados na rota
import CustomerHome from "../telas/customers/home";
import CustomerAdd from "../telas/customers/add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerHome />,
  },
  {
    path: "/customers",
    element: <CustomerHome />,
  },
  {
    path: "/customers/add",
    element: <CustomerAdd />,
  },
]);

export default router;
