import React, { useEffect, useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

// Componente da app
import Dashboard from "../../../components/Dashboard";
import SearchBar from "../../../components/SearchBar";
import DefaultAppButton from "../../../components/DefaultAppButton";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

// Serviços
import RequestHTTP from "../../../services/services";

function AuthHome() {
  const [authorizationsList, setAuthorizationsList] = useState([]);
  const [currentAuthorizationId, setCurrentAuthorizationId] = useState();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const GetValidAuthorizations = async () => {
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

  // const GetAllAuthorizations = async () => {
  //   const authorizations = await RequestHTTP.GetPaginatedItems(
  //     "/authorizations",
  //     "1000"
  //   );

  //   setAuthorizationsList(authorizations);
  // };

  useEffect(() => {
    GetValidAuthorizations();
  }, []);

  const buttonsGroup = [
    {
      title: "Ações",
      component: ({ _id = "_id" }) => {
        return (
          <>
            <DefaultAppButton
              variant="danger"
              title="Deletar"
              action={() => {
                setCurrentAuthorizationId(_id);
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
        deleteId={currentAuthorizationId}
        message="Tem certeza que deseja deletar esta guia?"
        deleteRoute={"/authorizations"}
      />
      <Container fluid>
        <Container fluid className="pt-3 pb-2 mb-3 border-bottom">
          <Row className="align-items-center">
            <Col md="auto">
              <h1 className="h2">Guias emitidas:</h1>
            </Col>
            <Col md="auto" className="flex-fill">
              <SearchBar // É necessário ajustar, porque o campo tem referência
                route="/authorizations"
                setSearchResults={setAuthorizationsList}
              />
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
          buttonsGroup={buttonsGroup}
        />
      </Container>
    </>
  );
}

export default AuthHome;
