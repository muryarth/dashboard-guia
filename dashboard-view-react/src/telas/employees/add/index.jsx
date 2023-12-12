import React, { useState } from "react";

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
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const SubmitFormData = async () => {
    const body = {};

    body.nome = name || "";
    body.login = login || "";
    body.senha = password || "";
    body.administrador = isAdmin || false;
    body.ativo = true;

    if (
      Object.keys(body).length > 0 &&
      name !== "" &&
      login !== "" &&
      password !== ""
    ) {
      await RequestHTTP.AddItem("/employees", body);
      window.location.href = "/employees";
    }
  };

  return (
    <Container fluid>
      <Container fluid className="pt-3 pb-2 mb-3 border-bottom">
        <Row className="justify-content-between align-items-center">
          <Col md="auto">
            <h1 className="h2">Cadastrar funcionário: </h1>
          </Col>
        </Row>
      </Container>

      <Form>
        <Row className="form-group mb-4">
          <Col>
            <DefaultAppFormField
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
              label={"Login"}
              placeholder={"Insira o login..."}
              state={login}
              setState={setLogin}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              label={"Senha"}
              placeholder={"Insira a senha..."}
              state={password}
              setState={setPassword}
              required={true}
            />
          </Col>
        </Row>

        <Button variant="primary" onClick={() => SubmitFormData()}>
          Adicionar Funcionário
        </Button>
        <Form.Group className="mb-4"></Form.Group>
      </Form>
    </Container>
  );
}
