import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ButtonToolbar,
} from "react-bootstrap";

// Componente da app
import Dashboard from "../../../components/Dashboard";

import RequestHTTP from "../../../services/services";

// Placeholder Loader
// import ContentLoader from "react-content-loader";

function EmployeesHome() {
  const [employeesList, setEmployeesList] = useState([]);

  const GetEmployees = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/employees");
    setEmployeesList(data);
  };

  useEffect(() => {
    GetEmployees();
  }, []);

  const actionsButtonGroup = [
    {
      title: "Ações",
      component: (
        <>
          <Button
            variant="info"
            size="sm"
            className="me-2"
            onClick={() => console.log("Teste")}
          >
            Visualizar
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="me-2"
            onClick={() => console.log("Teste")}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => console.log("Teste")}
          >
            Deletar
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col>
          <Container fluid className="pt-3 pb-2 mb-3 border-bottom">
            <Row className="justify-content-between align-items-center">
              <Col md="auto">
                <h1 className="h2">Dashboard de funcionários:</h1>
              </Col>
              <Col md="auto">
                <ButtonToolbar className="mb-2 mb-md-0">
                  <Button
                    href="/employees/add"
                    variant="outline-secondary"
                    size="sm"
                  >
                    + Novo Funcionário
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Container>

          <Dashboard
            elements={employeesList}
            fields={["nome", "administrador", "registerDate", "lastUpdated"]}
            buttonsGroup={actionsButtonGroup}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeesHome;