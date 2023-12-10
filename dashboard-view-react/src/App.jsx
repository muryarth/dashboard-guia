import React from "react";

// Router
import { RouterProvider } from "react-router-dom";
import routes from "./routes";


// Componentes
import Main from "./telas";

function App() {
  return (
    <>
      <Main>
        <RouterProvider router={routes} />
      </Main>
    </>
  );
}

export default App;
