import React, { useState, useEffect } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Componentes da App
import CustomAuthorizationDropdown from "./components/CustomAuthorizationDropdown";
import AddItemModal from "./components/AddItemModal";
import DefaultAppFormField from "../../../components/DefaultAppFormField";

// services.js
import RequestHTTP from "../../../services/services";

export default function AgreeAdd() {
  const [showClinicModal, setShowClinicModal] = useState();
  const [showExpertiseModal, setShowExpertiseModal] = useState();
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
      if (response) window.location.reload();
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

  const JoinArrayByName = (array, field = "nome") => {
    const formattedArray = array.map((item) => item[field]);
    const string = formattedArray.join("; ");
    return string;
  };

  useEffect(() => {
    GetAllDropdownData();
  }, []);

  return (
    <>
      {/* Criar nova especialidade */}
      <AddItemModal
        label={"Especialidade"}
        route={"/expertises"}
        showModal={showExpertiseModal}
        setShowModal={setShowExpertiseModal}
        title="Criar nova especialidade"
      />

      {/* Criar novo local */}
      <AddItemModal
        label={"Local"}
        route={"/clinics"}
        showModal={showClinicModal}
        setShowModal={setShowClinicModal}
        title="Criar novo local"
      />

      <Container fluid>
        <Container fluid className="pt-3 pb-2 mb-3 border-bottom">
          <Row className="justify-content-between align-items-center">
            <Col md="auto">
              <h1 className="h2">Cadastrar convênio: </h1>
            </Col>
          </Row>
        </Container>

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
            <Col className="d-flex flex-column align-items-start">
              <div className="d-flex">
                <CustomAuthorizationDropdown
                  title={"Especialidades"}
                  list={especialidades}
                  state={especialidadesAtivas}
                  setState={setEspecialidadesAtivas}
                />
                <Button
                  className="ms-2"
                  variant={"light"}
                  onClick={() => {
                    setShowExpertiseModal(true);
                  }}
                >
                  + Criar novo
                </Button>
              </div>
              <p
                style={{ overflowWrap: "break-word", maxWidth: "350px" }}
                className="mt-2"
              >
                <span>{`Selecionados: `}</span>
                {especialidadesAtivas.length > 0
                  ? `${JoinArrayByName(especialidadesAtivas)}`
                  : "Nenhum"}
              </p>
            </Col>

            {/* Locais */}
            <Col className="d-flex flex-column align-items-start">
              <div className="d-flex">
                <CustomAuthorizationDropdown
                  title={"Locais"}
                  list={locais}
                  state={locaisAtivos}
                  setState={setLocaisAtivos}
                />
                <Button
                  className="ms-2"
                  variant={"light"}
                  onClick={() => {
                    setShowClinicModal(true);
                  }}
                >
                  + Criar novo
                </Button>
              </div>
              <p
                style={{ overflowWrap: "break-word", maxWidth: "350px" }}
                className="mt-2"
              >
                <span>{`Selecionados: `}</span>
                {locaisAtivos.length > 0
                  ? `${JoinArrayByName(locaisAtivos)}`
                  : "Nenhum"}
              </p>
            </Col>
          </Row>

          <Button
            variant="primary"
            onClick={() => SubmitAgreeData()}
            className="mt-4"
          >
            Criar Convênio
          </Button>
        </Form>
      </Container>
    </>
  );
}
