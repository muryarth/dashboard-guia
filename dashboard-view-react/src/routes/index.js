import { createBrowserRouter } from "react-router-dom";

// Rotas
import CustomersRoutes from "./customersRoutes";
import EmployeesRoutes from "./employeesRoutes";
import AuthRoutes from "./authRoutes";
import AgreeRoutes from "./agreeRoutes";
import AboutRoutes from "./aboutRoutes";
import UserRoutes from "./userRoutes";

const routes = createBrowserRouter([
  ...CustomersRoutes,
  ...EmployeesRoutes,
  ...AuthRoutes,
  ...AgreeRoutes,
  ...AboutRoutes,
  ...UserRoutes,
]);

export default routes;
