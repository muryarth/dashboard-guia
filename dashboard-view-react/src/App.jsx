import React, { useEffect, useState } from "react";

// Router
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

// Componentes
import Main from "./telas";

function App() {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const currentRoute = window.location.pathname;

  const HandleUserIsSigningIn = () => {
    if (
      currentRoute === "/user/login" ||
      currentRoute === "/user/register" ||
      currentRoute === "/"
    ) {
      setIsSigningIn(true);
    } else {
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    HandleUserIsSigningIn();
  }, []);

  return (
    <>
      {isSigningIn ? (
        <RouterProvider router={routes} />
      ) : (
        <Main>
          <RouterProvider router={routes} />
        </Main>
      )}
    </>
  );
}

export default App;
