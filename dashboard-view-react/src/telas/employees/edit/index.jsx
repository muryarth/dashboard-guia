import React, { useEffect, useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Componentes da App
import DefaultAppFormField from "../../../components/DefaultAppFormField";
import RequestHTTP from "../../../services/services";

export default function EmployeesAdd() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState();
  const [currentEmployeeData, setCurrentEmployeeData] = useState();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const SubmitFormData = async () => {
    const body = {};

    if (name !== currentEmployeeData.nome) body.nome = name || "";
    if (login !== currentEmployeeData.login) body.login = login || "";
    if (isAdmin !== currentEmployeeData.administrador)
      body.administrador = isAdmin || false;

    console.log(body);

    if (Object.keys(body).length > 0) {
      const response = await RequestHTTP.UpdateItem(
        "/employees",
        currentEmployeeId,
        body
      );
      if (response) window.location.reload();
    }
  };

  // Popula os dados de cada formulário
  const PopulateFormsData = (currentEmployeeData) => {
    if (currentEmployeeData) {
      setName(currentEmployeeData.nome);
      setIsAdmin(currentEmployeeData.administrador);
      setLogin(currentEmployeeData.login);
      setPassword("********");
    }
  };

  const GetEmployeeDataById = async (_id) => {
    if (_id !== undefined) {
      const response = await RequestHTTP.GetItemById("/employees", _id);
      setCurrentEmployeeId(_id);
      setCurrentEmployeeData(response);
    }
  };

  // Roda sempre que o componente é montado
  useEffect(() => {
    if (window.location.search) {
      const _id = window.location.search.split("?_id=")[1];
      GetEmployeeDataById(_id);
    }
  }, []);

  // Roda sempre que currentUserId for atualizado
  useEffect(() => {
    if (currentEmployeeData) PopulateFormsData(currentEmployeeData);
  }, [currentEmployeeData]);

  return (
    <Container fluid>
      <Form>
        <Row className="form-group mb-4">
          <Col>
            <DefaultAppFormField
              disabled={!isEditing}
              label={"Nome"}
              placeholder={"Insira o nome..."}
              state={name}
              setState={setName}
              required={true}
            />
          </Col>

          <Col className="align-items-center">
            <Form.Label>Administrador: </Form.Label>
            <DropdownButton
              variant="light"
              id="dropdown-basic-button"
              title={isAdmin ? "Sim" : "Não"}
              disabled={!isEditing}
            >
              <Dropdown.Item onClick={() => setIsAdmin(true)}>
                Sim
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setIsAdmin(false)}>
                Não
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>
            <DefaultAppFormField
              disabled={!isEditing}
              label={"Login"}
              placeholder={"Insira o login..."}
              state={login}
              setState={setLogin}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              disabled={true}
              label={"Senha"}
              placeholder={"Insira a senha..."}
              state={password}
              setState={setPassword}
              required={true}
            />
          </Col>
        </Row>

        {!isEditing ? (
          <Button
            className="ms-2"
            variant="primary"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </Button>
        ) : (
          <>
            <Button
              className="ms-2"
              variant="primary"
              onClick={() => SubmitFormData()}
            >
              Salvar
            </Button>
            <Button
              className="ms-2"
              variant="primary"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
          </>
        )}
        <Form.Group className="mb-4"></Form.Group>
      </Form>
    </Container>
  );
}
