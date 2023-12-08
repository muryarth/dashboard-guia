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
import AuthorizationModal from "./components/AuthorizationModal";
import AgreementsModal from "./components/AgreementsModal";

// Serviços
import RequestHTTP from "../../../services/services";

function CustomersHome() {
  const [customersList, setCustomersList] = useState([]);
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: null, name: null });
  const [agreementsList, setAgreementsList] = useState();
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const actionsButtonGroup = [
    {
      title: "Ações",
      component: ({ _id = "_id", name = "name" }) => {
        return (
          <>
            <Button
              variant="success"
              size="sm"
              className="me-2"
              onClick={() => {
                setCurrentUser({ _id: _id, name: name });
                setShowAuthorizationModal(true);
              }}
            >
              Emitir
            </Button>
            <Button
              variant="info"
              size="sm"
              className="me-2"
              onClick={() => {
                setCurrentUser({ _id: _id, name: name });
                setShowAgreementModal(true);
              }}
            >
              Convênios
            </Button>
            {/* <Button
              variant="primary"
              size="sm"
              className="me-2"
              onClick={() => console.log("Editar")}
            >
              Editar
            </Button> */}
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                RequestHTTP.DeleteItemById("/customers", _id);
                window.location.reload();
              }}
            >
              Deletar
            </Button>
          </>
        );
      },
    },
  ];

  const GetCustomers = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/customers");
    setCustomersList(data);
  };

  const GetAllAgreements = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/agreements");
    setAgreementsList(data);
  };

  useEffect(() => {
    GetCustomers();
  }, []);

  useEffect(() => {
    if (showAgreementModal) {
      GetAllAgreements();
    }
  }, [showAgreementModal]);

  return (
    <>
      <AuthorizationModal
        showModal={showAuthorizationModal}
        handleClose={() => setShowAuthorizationModal(false)}
        currentUserId={currentUser._id}
        currentUserName={currentUser.name}
      />
      <AgreementsModal
        showModal={showAgreementModal}
        handleClose={() => setShowAgreementModal(false)}
        currentUserId={currentUser._id}
        currentUserName={currentUser.name}
        agreements={agreementsList}
        dropdownOptions={dropdownOptions}
        setDropdownOptions={setDropdownOptions}
      />

      <Container fluid>
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
          elements={customersList}
          fields={["nome", "cpf", "email", "telefone", "registerDate"]}
          buttonsGroup={actionsButtonGroup}
        />
      </Container>
    </>
  );
}

export default CustomersHome;
