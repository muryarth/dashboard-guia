import React, { useEffect } from "react";
// import Button from "react-bootstrap/Button";

function App() {
  const GetEmployees = async () => {
    const url = "http://dashboard-server-api.vercel.app/employees";

    const result = await fetch(url);
    console.log(result);

    return result;
  };

  useEffect(() => {
    const result = GetEmployees();
    console.log(result);
  }, []);

  return <div></div>;
}

export default App;
