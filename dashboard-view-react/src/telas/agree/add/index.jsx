import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import RequestHTTP from "../../../services/services";

export default function AgreeAdd() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState();
  const [especialidades, setEspecialidades] = useState([]);
  const [locais, setLocal] = useState([]);
  const [especialidadesAtivas, setEspecialidadesAtivas] = useState([]);
  const [locaisAtivos, setLocaisAtivos] = useState([]);

  const CustomFormField = (
    label,
    placeholder,
    nome,
    set,
    required = false,
    as = "input"
  ) => {
    return (
      <>
        <Form.Group controlId={nome} className="mb-4">
          <Form.Label>{`${label}:`}</Form.Label>
          <Form.Control
            type="text"
            placeholder={placeholder}
            value={nome}
            onChange={(event) => set(event.target.value)}
            required={required}
            as={as}
            rows={as === "textarea" ? 6 : null}
          />
        </Form.Group>
      </>
    );
  };

  const GetAllDropdownData = async () => {
    const dadosEspecialidades = await RequestHTTP.GetAllItems("/expertises");
    const dadosLocalidades = await RequestHTTP.GetAllItems("/clinics");

    console.log(dadosEspecialidades, dadosLocalidades);

    setLocal(dadosLocalidades);
    setEspecialidades(dadosEspecialidades);
  };

  useEffect(() => {
    GetAllDropdownData();
  }, []);

  const SubmitAgreeData = () => {
    const body = {};

    body.especialidades = [];
    body.locais = [];

    console.log(especialidadesAtivas, locaisAtivos);

    especialidadesAtivas.map((especialidade) => {
      body.especialidades.push(especialidade._id);
    });
    locaisAtivos.map((local) => {
      body.locais.push(local._id);
    });

    body.nome = nome;
    body.preco = preco;
    body.criadoPor = "656cb3af8d7c85e024a6a892";

    if (body.especialidades.length > 0 && body.locais.length > 0) {
      RequestHTTP.AddItem("/agreements", body);
      // window.location.reload();
    }
  };

  return (
    <Container fluid>
      <Form>
        <Row className="form-group mb-4">
          {/* Nome */}
          <Col>
            {CustomFormField("Nome", "Insira o nome...", nome, setNome, true)}
          </Col>

          {/* Preço */}
          <Col>
            {CustomFormField(
              "Preço",
              "Insira o preço...",
              preco,
              setPreco,
              true
            )}
          </Col>
        </Row>

        <Form>
          <Row className="mb-2">
            {/* Especialidades */}
            <Col>
              {/* Especialidades */}
              <Dropdown disabled>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {/* {especialidadeAtiva
                    ? especialidadeAtiva.nome
                    : "Especialidade"} */}
                  Especialidade
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    key={"0"}
                    // onClick={() => setEspecialidadeAtiva(null)}
                  >
                    {"Nenhum"}
                  </Dropdown.Item>
                  {especialidades.length > 0 &&
                    especialidades.map((especialidade) => {
                      return (
                        <Dropdown.Item
                          key={especialidade._id}
                          onClick={() => {
                            let array = especialidadesAtivas;
                            array.push({
                              _id: especialidade._id,
                              nome: especialidade.especialidade,
                            });
                            setEspecialidadesAtivas(array);
                          }}
                        >
                          {especialidade.especialidade}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            {/* Campo de Input para Especialidades */}
            <Col>
              <Form.Control type="text" placeholder="Especialidades" />
            </Col>
          </Row>

          <Row className="mb-2">
            {/* Locais */}
            <Col>
              {/* Locais */}
              <Dropdown disabled>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {/* {localAtivo ? localAtivo.nome : "Local"} */}
                  Local
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    key={"0"}
                    // onClick={() => setLocalAtivo(null)}
                  >
                    {"Nenhum"}
                  </Dropdown.Item>
                  {locais.length > 0 &&
                    locais.map((local) => {
                      return (
                        <Dropdown.Item
                          key={local._id}
                          onClick={() => {
                            let array = locaisAtivos;
                            array.push({
                              _id: local._id,
                              nome: local.nome,
                            });
                            setLocaisAtivos(array);
                          }}
                        >
                          {local.nome}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            {/* Campo de Input para Locais */}
            <Col>
              <Form.Control
                type="text"
                placeholder="Locais"
                value={locaisAtivos}
              />
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Button variant="primary" onClick={() => SubmitAgreeData()}>
              Adicionar Cliente
            </Button>
          </Form.Group>
        </Form>
      </Form>
    </Container>
  );
}
