import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonToolbar,
} from "react-bootstrap";

// Componente da app
import Dashboard from "../../../components/Dashboard";

import RequestHTTP from "../../../services/services";

// Placeholder Loader
// import ContentLoader from "react-content-loader";

function AuthHome() {
  const [authorizationsList, setAuthorizationsList] = useState([]);

  // const GetCustomerAuthorizationByName = async () => {
  //   console.log(searchName);

  //   if (searchName !== "") {
  //     const data = await RequestHTTP.GetItemsBySearch(
  //       "/authorizations",
  //       `name=${searchName}`
  //     );
  //     setAuthorizationsList(data);
  //   }
  // };

  const GetCustomerAuthorization = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/authorizations");
    setAuthorizationsList(data);
  };

  useEffect(() => {
    GetCustomerAuthorization();
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
            <Row className="align-items-center">
              <Col md="auto">
                <h1 className="h2">Guias emitidas:</h1>
              </Col>
              <Col md="auto" className="flex-fill">
                <Form.Control
                  type="text"
                  placeholder="Pesquisar..."
                  className="mr-sm-2"
                />
              </Col>
              <Col md="auto">
                <ButtonToolbar className="mb-2 mb-md-0">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {}}
                  >
                    Pesquisar
                  </Button>
                </ButtonToolbar>
              </Col>
              <Col md="auto">
                <ButtonToolbar className="mb-2 mb-md-0">
                  <Button
                    href="/authorizations/add"
                    variant="outline-secondary"
                    size="sm"
                  >
                    + Nova Guia
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Container>

          <Dashboard
            elements={authorizationsList}
            fields={["cliente", "local", "especialidade", "registerDate"]}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AuthHome;
