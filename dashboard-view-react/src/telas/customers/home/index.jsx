import React, { useEffect, useState } from "react";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

// Componente da app
import Dashboard from "../../../components/Dashboard";
import AuthorizationModal from "./components/AuthorizationModal";
import AgreementsModal from "./components/AgreementsModal";
import DefaultAppButton from "../../../components/DefaultAppButton";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

// Serviços
import RequestHTTP from "../../../services/services";

function CustomersHome() {
  const [customersList, setCustomersList] = useState([]);
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: null, name: null });
  const [agreementsList, setAgreementsList] = useState();
  const [dropdownOptions, setDropdownOptions] = useState([]);

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

  const buttonsGroup = [
    {
      title: "Ações",
      component: ({ _id = "_id", name = "name" }) => {
        return (
          <>
            <DefaultAppButton
              variant="success"
              title="Emitir"
              action={() => {
                setCurrentUser({ _id: _id, name: name });
                setShowAgreementModal(false);
                setShowDeleteConfirmationModal(false);
                setShowAuthorizationModal(true);
              }}
            />
            <DefaultAppButton
              variant="info"
              title="Convênios"
              action={() => {
                setCurrentUser({ _id: _id, name: name });
                setShowAgreementModal(true);
                setShowDeleteConfirmationModal(false);
                setShowAuthorizationModal(false);
              }}
            />
            {/* <DefaultAppButton
              variant="primary"
              title="Editar"
              action={() => console.log("Editar")}
            /> */}
            <DefaultAppButton
              variant="danger"
              title="Deletar"
              action={() => {
                setCurrentUser({ _id: _id, name: name });
                setShowAgreementModal(false);
                setShowDeleteConfirmationModal(true);
                setShowAuthorizationModal(false);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <AuthorizationModal
        showModal={showAuthorizationModal}
        handleClose={() => setShowAuthorizationModal(false)}
        currentUserId={currentUser._id}
        currentUserName={`${currentUser.name}`}
      />
      <AgreementsModal
        showModal={showAgreementModal}
        handleClose={() => setShowAgreementModal(false)}
        currentUserId={currentUser._id}
        currentUserName={`${currentUser.name}`}
        agreements={agreementsList}
        dropdownOptions={dropdownOptions}
        setDropdownOptions={setDropdownOptions}
      />
      <DeleteConfirmationModal
        showModal={showDeleteConfirmationModal}
        handleClose={() => setShowDeleteConfirmationModal(false)}
        deleteName={`${currentUser.name}`}
        deleteId={currentUser._id}
        deleteRoute={"/customers"}
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
          buttonsGroup={buttonsGroup}
        />
      </Container>
    </>
  );
}

export default CustomersHome;
