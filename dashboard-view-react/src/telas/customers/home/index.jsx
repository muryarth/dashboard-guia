import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import RequestHTTP from "../../../services/services";

// Placeholder Loader
// import ContentLoader from "react-content-loader";

// Estilos
import "./home.css";

function Home() {
  const [customerList, setCustomerList] = useState([]);

  const GetCustomers = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/customers");
    setCustomerList(data);
  };

  useEffect(() => {
    GetCustomers();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={9} lg={10} className="px-md-4">
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
          {console.log(customerList)}
          {customerList.length > 0 ? (
            <div className="table-responsive">
              <Table striped bordered hover size="sm">
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
                        <Button variant="info" size="sm" className="me-2">
                          Visualizar
                        </Button>
                        <Button variant="primary" size="sm" className="me-2">
                          Editar
                        </Button>
                        <Button variant="danger" size="sm">
                          Deletar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>No customers available.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
