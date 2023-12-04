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
import StyledModal from "../../../components/StyledModal";

// Serviços
import RequestHTTP from "../../../services/services";

// Placeholder Loader
// import ContentLoader from "react-content-loader";

function CustomersHome() {
  const [customerList, setCustomerList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const actionsButtonGroup = [
    {
      title: "Ações",
      component: (
        <>
          <Button
            variant="success"
            size="sm"
            className="me-2"
            onClick={() => handleShow()}
          >
            Emitir
          </Button>
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

  const GetCustomers = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/customers");
    setCustomerList(data);
  };

  useEffect(() => {
    GetCustomers();
  }, []);

  return (
    <>
      <StyledModal showModal={showModal} handleClose={handleClose} />

      <Container fluid>
        <Row>
          <Col>
            <Container fluid className="pt-3 pb-2 mb-3 border-bottom">
              <Row className="justify-content-between align-items-center">
                <Col md="auto">
                  <h1 className="h2">Clientes:</h1>
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
                      href="/customers/add"
                      variant="outline-secondary"
                      size="sm"
                    >
                      + Novo Cliente
                    </Button>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Container>

            <Dashboard
              elements={customerList}
              fields={[
                "_id",
                "nome",
                "cpf",
                "email",
                "telefone",
                "registerDate",
              ]}
              buttonsGroup={actionsButtonGroup}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CustomersHome;
