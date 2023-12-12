import CustomersHome from "../telas/customers/home";
import CustomersAdd from "../telas/customers/add";
import CustomersEdit from "../telas/customers/edit";

const CustomersRoutes = [
  // {
  //   path: "/",
  //   element: <CustomersHome />,
  // },
  {
    path: "/customers",
    element: <CustomersHome />,
  },
  {
    path: "/customers/add",
    element: <CustomersAdd />,
  },
  {
    path: "/customers/edit",
    element: <CustomersEdit />,
  },
];

export default CustomersRoutes;
