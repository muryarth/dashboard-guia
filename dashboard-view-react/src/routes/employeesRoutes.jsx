import EmployeesHome from "../telas/employees/home";
import EmployeesAdd from "../telas/employees/add";
import EmployeesEdit from "../telas/employees/edit";

const EmployeesRoutes = [
  {
    path: "/employees",
    element: <EmployeesHome />,
  },
  {
    path: "/employees/add",
    element: <EmployeesAdd />,
  },
  {
    path: "/employees/edit",
    element: <EmployeesEdit />,
  },
];

export default EmployeesRoutes;
