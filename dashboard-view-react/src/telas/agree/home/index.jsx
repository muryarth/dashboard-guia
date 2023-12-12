import React, { useEffect, useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

// Componente da app
import Dashboard from "../../../components/Dashboard";
import DeleteConfirmationModal from "../../../components/DeleteAndUpdateModal";
import DefaultAppButton from "../../../components/DefaultAppButton";
import SearchBar from "../../../components/SearchBar";

// services.js
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
              <SearchBar // É necessário ajustar
                route="/agreements"
                setSearchResults={setAgreementsList}
              />
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
          fields={["nome", "preco", "locais", "especialidades"]}
          buttonsGroup={buttonsGroup}
        />
      </Container>
    </>
  );
}

export default AgreeHome;
