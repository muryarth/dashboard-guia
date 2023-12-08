import AgreeHome from "../telas/agree/home";
import AgreeAdd from "../telas/agree/add";

const AgreeRoutes = [
  {
    path: "/agreements",
    element: <AgreeHome />,
  },
  {
    path: "/agreements/add",
    element: <AgreeAdd />,
  },
];

export default AgreeRoutes;
