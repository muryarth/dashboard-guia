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

// Serviços
import RequestHTTP from "../../../services/services";

function AuthHome() {
  const [authorizationsList, setAuthorizationsList] = useState([]);

  const GetCustomerAuthorization = async () => {
    const authorizations = await RequestHTTP.GetPaginatedItems(
      "/authorizations",
      "1000"
    );

    if (authorizations.length > 0) {
      // Atenção que isso aqui é gambiarra! Caso coloque paginação, essa solução pode gerar problemas
      // Filtra os itens que tem o campo cliente igual a null
      let validAuthorizations = [];
      validAuthorizations = authorizations.filter(
        (authorization) => authorization.cliente !== null
      );
      setAuthorizationsList(validAuthorizations);
    }
  };

  useEffect(() => {
    GetCustomerAuthorization();
  }, []);

  const actionsButtonGroup = [
    {
      title: "Ação",
      component: ({ _id = "_id", name = "name" }) => {
        return (
          <>
            <Button
              variant="danger"
              size="sm"
              onClick={() => console.log("Teste > ", _id, name)}
            >
              Deletar
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Container fluid>
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
              <Button variant="outline-secondary" size="sm" onClick={() => {}}>
                Pesquisar
              </Button>
            </ButtonToolbar>
          </Col>
          <Col md="auto">
            <ButtonToolbar className="mb-2 mb-md-0">
              <Button href="/customers" variant="outline-secondary" size="sm">
                + Nova Guia
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>

      <Dashboard
        elements={authorizationsList}
        fields={["cliente", "local", "especialidade", "registerDate"]}
        buttonsGroup={actionsButtonGroup}
      />
    </Container>
  );
}

export default AuthHome;
