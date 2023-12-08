import EmployeesHome from "../telas/employees/home";
import EmployeesAdd from "../telas/employees/add";

const EmployeesRoutes = [
  {
    path: "/employees",
    element: <EmployeesHome />,
  },
  {
    path: "/employees/add",
    element: <EmployeesAdd />,
  },
];

export default EmployeesRoutes;
