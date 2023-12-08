import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import RequestHTTP from "../../../services/services";
import CustomAuthorizationDropdown from "./components/CustomAuthorizationDropdown";
import DefaultAppFormField from "../../../components/DefaultAppFormField";

export default function AgreeAdd() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesAtivas, setEspecialidadesAtivas] = useState([]);
  const [locais, setLocal] = useState([]);
  const [locaisAtivos, setLocaisAtivos] = useState([]);

  const SubmitAgreeData = async () => {
    const body = {};

    body.especialidades = [];
    body.locais = [];

    especialidadesAtivas.forEach((especialidade) => {
      body.especialidades.push(especialidade._id);
    });

    locaisAtivos.forEach((local) => {
      body.locais.push(local._id);
    });

    body.nome = nome;
    body.preco = preco;
    body.criadoPor = "656cb3af8d7c85e024a6a892";

    console.log(body);

    if (
      body.especialidades.length > 0 &&
      body.locais.length > 0 &&
      body.nome &&
      body.preco
    ) {
      const response = await RequestHTTP.AddItem("/agreements", body);
      // console.log(response);
      // window.location.reload();
    }
  };

  const GetAllDropdownData = async () => {
    const dadosEspecialidades = await RequestHTTP.GetPaginatedItems(
      "/expertises",
      100
    );
    const dadosLocalidades = await RequestHTTP.GetPaginatedItems(
      "/clinics",
      100
    );

    setLocal(dadosLocalidades);
    setEspecialidades(dadosEspecialidades);
  };

  useEffect(() => {
    GetAllDropdownData();
  }, []);

  return (
    <Container fluid>
      <Form>
        <Row className="form-group mb-4">
          {/* Nome */}
          <Col>
            <DefaultAppFormField
              label={"Nome"}
              placeholder={"Insira o nome..."}
              state={nome}
              setState={setNome}
              required={true}
            />
          </Col>

          {/* Preço */}
          <Col>
            <DefaultAppFormField
              label={"Preço"}
              placeholder={"Insira o preço..."}
              state={preco}
              setState={setPreco}
              required={true}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          {/* Especialidades */}
          <Col>
            <CustomAuthorizationDropdown
              title={"Especialidades"}
              list={especialidades}
              state={especialidadesAtivas}
              setState={setEspecialidadesAtivas}
            />
          </Col>

          {/* Locais */}
          <Col>
            <CustomAuthorizationDropdown
              title={"Locais"}
              list={locais}
              state={locaisAtivos}
              setState={setLocaisAtivos}
            />
          </Col>
        </Row>

        <Form.Group>
          <Button variant="primary" onClick={() => SubmitAgreeData()}>
            Criar guia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
