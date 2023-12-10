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
import DeleteConfirmationModal from "../../../components/DeleteAndUpdateModal";
import DefaultAppButton from "../../../components/DefaultAppButton";

import RequestHTTP from "../../../services/services";

function AgreeHome() {
  const [agreementsList, setAgreementsList] = useState([]);
  const [currentAgreement, setCurrentAgreement] = useState({
    _id: null,
    name: null,
  });
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const GetAllAgreements = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/agreements");
    setAgreementsList(data);
  };

  useEffect(() => {
    GetAllAgreements();
  }, []);

  const buttonsGroup = [
    {
      title: "Ações",
      component: ({ _id = "_id", name = "name" }) => {
        return (
          <>
            <DefaultAppButton
              variant="danger"
              title="Deletar"
              action={() => {
                setCurrentAgreement({ _id: _id, name: name });
                setShowDeleteConfirmationModal(true);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <DeleteConfirmationModal
        showModal={showDeleteConfirmationModal}
        setShowModal={() => setShowDeleteConfirmationModal(false)}
        deleteName={`${currentAgreement.name}`}
        deleteId={currentAgreement._id}
        deleteRoute={"/agreements"}
      />

      <Container fluid>
        <Container fluid className="pt-3 pb-2 mb-3 border-bottom">
          <Row className="align-items-center">
            <Col md="auto">
              <h1 className="h2">Convênios:</h1>
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
                  href="/agreements/add"
                  variant="outline-secondary"
                  size="sm"
                >
                  + Novo Convênio
                </Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Container>

        <Dashboard
          elements={agreementsList}
          fields={["nome", "locais", "especialidades"]}
          buttonsGroup={buttonsGroup}
        />
      </Container>
    </>
  );
}

export default AgreeHome;
