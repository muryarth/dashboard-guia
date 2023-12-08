import React from "react";

// Router
import { RouterProvider } from "react-router-dom";
import router from "./rotas";

// Componentes
import Main from "./telas";

function App() {
  return (
    <>
      <Main>
        <RouterProvider router={router} />
      </Main>
    </>
  );
}

export default App;
