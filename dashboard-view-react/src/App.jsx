import React from "react";

// Router
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

// Componentes
import Main from "./telas";

function App() {
  const currentRoute = window.location.pathname;

  return (
    <>
      {currentRoute !== "/user/login" &&
      currentRoute !== "/user/register" &&
      currentRoute !== "/" ? (
        <Main>
          <RouterProvider router={routes} />
        </Main>
      ) : (
        <RouterProvider router={routes} />
      )}
    </>
  );
}

export default App;
