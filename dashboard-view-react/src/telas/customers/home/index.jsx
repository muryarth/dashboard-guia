import React, { useEffect, useState } from "react";
import "./home.css";

function Home() {
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await fetch(
          "https://dashboard-server-api.vercel.app/customers",
          { method: "GET" }
        );
        const data = await response.json();

        if (Array.isArray(data.results)) {
          setCustomerList(data.results);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    getCustomers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>

            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <a
                  href="/customers/add"
                  className="btn btn-sm btn-outline-secondary"
                >
                  + Novo Cliente
                </a>
              </div>
            </div>
          </div>

          {customerList.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {customerList.map((customer) => (
                    <tr key={customer._id}>
                      <td>{customer.nome}</td>
                      <td>{customer.sobrenome}</td>
                      <td>{customer.email}</td>
                      <td>{customer.telefone}</td>
                      <td>
                        <button className="btn btn-sm btn-info me-2">
                          Visualizar
                        </button>
                        <button className="btn btn-sm btn-primary me-2">
                          Editar
                        </button>
                        <button className="btn btn-sm btn-danger">
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No customers available.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
