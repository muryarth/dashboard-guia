import UserLogin from "../telas/user/login";
import UserRegister from "../telas/user/register";

const UserRoutes = [
  {
    path: "/",
    element: <UserLogin />,
  },
  {
    path: "/user/login",
    element: <UserLogin />,
  },
  {
    path: "/user/register",
    element: <UserRegister />,
  },
];

export default UserRoutes;
