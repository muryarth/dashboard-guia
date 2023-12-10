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

// services.js
import RequestHTTP from "../../../services/services";

function EmployeesHome() {
  const [employeesList, setEmployeesList] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({
    _id: null,
    name: null,
  });
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const GetEmployees = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/employees");
    setEmployeesList(data);
  };

  useEffect(() => {
    GetEmployees();
  }, []);

  const buttonsGroup = [
    {
      title: "Ações",
      component: ({ _id = "_id", name = "name" }) => {
        return (
          <>
            <DefaultAppButton
              variant="primary"
              title="Editar"
              action={() =>
                (window.location.href = `/employees/edit?_id=${_id}`)
              }
            />
            <DefaultAppButton
              variant="danger"
              title="Deletar"
              action={() => {
                setCurrentEmployee({ _id: _id, name: name });
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
        deleteName={`${currentEmployee.name}`}
        deleteId={currentEmployee._id}
        deleteRoute={"/employees"}
      />

      <Container fluid>
        <Container fluid className="pt-3 pb-2 mb-3 border-bottom">
          <Row className="justify-content-between align-items-center">
            <Col md="auto">
              <h1 className="h2">Funcionários:</h1>
            </Col>
            <Col md="auto" className="flex-fill">
              <SearchBar
                route="/employees"
                setSearchResults={setEmployeesList}
              />
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
          buttonsGroup={buttonsGroup}
        />
      </Container>
    </>
  );
}

export default EmployeesHome;
