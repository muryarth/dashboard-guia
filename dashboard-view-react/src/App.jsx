import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";

function App() {
  const [resultados, setResultados] = useState();

  const GetEmployees = async () => {
    const url = "http://dashboard-server-api.vercel.app/employees";
    // const url = "http://localhost:3000/employees";

    const response = await (await fetch(url)).json();
    setResultados(response);
    console.log(response);

    return result;
  };

  useEffect(() => {
    GetEmployees();
  }, []);

  return <div></div>;
}

export default App;
