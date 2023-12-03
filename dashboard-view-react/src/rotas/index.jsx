import React from "react";

// Router
import { createBrowserRouter } from "react-router-dom";

// Componentes sendo importados na rota
import { CustomersHome, CustomersAdd } from "./customersRoutes";
import { EmployeesHome } from "./employeesRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomersHome />,
  },
  {
    path: "/customers",
    element: <CustomersHome />,
  },
  {
    path: "/customers/add",
    element: <CustomersAdd />,
  },
  {
    path: "/employees",
    element: <EmployeesHome />,
  },
]);

export default router;
