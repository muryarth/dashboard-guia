import CustomersHome from "../telas/customers/home";
import CustomersAdd from "../telas/customers/add";

const CustomersRoutes = [
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
];

export default CustomersRoutes;
