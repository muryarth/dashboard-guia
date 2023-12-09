import React, { useState, useEffect } from "react";

//Bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";

// services.js
import RequestHTTP from "../../../../../services/services";

const CustomDropdown = ({
  list,
  state,
  setState,
  title = "Title",
  disabled = false,
}) => {
  return (
    <Dropdown>
      {/* Parte do título */}
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        disabled={disabled}
      >
        {state ? state.nome || state.especialidade : title}
      </Dropdown.Toggle>

      {/* Parte do menu */}
      <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
        {/* "Reset" */}
        <Dropdown.Item key={"0"} onClick={() => setState(null)}>
          {"Nenhum"}
        </Dropdown.Item>

        {/* Itens que serão renderizados dinamicamente */}
        {list.length > 0 &&
          list.map((listItem, index) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  if (listItem.hasOwnProperty("preco")) {
                    setState({
                      _id: listItem._id,
                      nome: listItem.nome,
                      preco: listItem.preco,
                    });
                  } else {
                    setState({
                      _id: listItem._id,
                      nome: listItem.nome || listItem.especialidade,
                    });
                  }
                }}
                key={`${index}`}
              >
                {listItem.nome || listItem.especialidade}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default function AuthorizationModal({
  showModal,
  setShowModal,
  currentUserId = "",
  currentUserName = "",
}) {
  const [isLoading, setIsLoading] = useState(false); // Controla o spinner
  const [convenios, setConvenios] = useState([]);
  const [convenioAtivo, setConvenioAtivo] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadeAtiva, setEspecialidadeAtiva] = useState(null);
  const [locais, setLocais] = useState([]);
  const [localAtivo, setLocalAtivo] = useState(null);

  const HandleClose = () => {
    setShowModal(false);
    setConvenios([]);
    setEspecialidades([]);
    setLocais([]);
  };

  const GetCurrentUserActiveAgreements = async () => {
    setIsLoading(true);
    const currentUser = await RequestHTTP.GetItemById(
      "/customers",
      `${currentUserId}`
    );

    const userAgreementsId = currentUser.conveniosAtivos;

    if (currentUser && userAgreementsId.length > 0) {
      const userAgreements = userAgreementsId.map(async (agreementId) => {
        const agreementObject = await RequestHTTP.GetItemById(
          "/agreements",
          agreementId
        );
        return agreementObject;
      });

      // console.log("Fora >", await Promise.all(userAgreements));
      setConvenios(await Promise.all(userAgreements));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const GetAllDropdownData = async (id) => {
    const dadosConvenio = await RequestHTTP.GetItemById("/agreements", id);
    setEspecialidades(dadosConvenio.especialidades);
    setLocais(dadosConvenio.locais);
  };

  const SubmitAuthorization = async () => {
    const body = {};

    if (currentUserId) body.cliente = currentUserId;
    if ("656cb3af8d7c85e024a6a892") body.criadoPor = "656cb3af8d7c85e024a6a892";
    if (especialidadeAtiva) body.especialidade = especialidadeAtiva;
    if (localAtivo) body.local = localAtivo;
    if (convenioAtivo) {
      body.preco = convenioAtivo.preco;
      body.convenio = convenioAtivo._id;
    }

    if (Object.keys(body).length > 0 && Object.keys(body).length === 6) {
      const response = await RequestHTTP.AddItem("/authorizations", body);
      if (response)
        setTimeout(() => {
          window.location.reload();
        }, 10);
    }
  };

  useEffect(() => {
    if (showModal) {
      GetCurrentUserActiveAgreements();
    }
  }, [showModal]);

  useEffect(() => {
    if (convenioAtivo !== undefined && convenioAtivo !== null)
      GetAllDropdownData(convenioAtivo._id);
  }, [convenioAtivo]);

  useEffect(() => {}, [convenios]);

  return (
    <Modal show={showModal} onHide={() => HandleClose()}>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <Container style={{ maxWidth: 420 }}>
            {currentUserName
              ? `Emitir guia para ${currentUserName}:`
              : "Emitir guia:"}
            <Spinner
              className={`ms-3 ${!isLoading ? "d-none" : ""}`}
              style={{
                width: "1.4rem",
                height: "1.4rem",
              }}
            />
          </Container>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container className="d-flex justify-content-between">
          {/* Convênios */}
          <CustomDropdown
            title={"Convênios"}
            list={convenios}
            state={convenioAtivo}
            setState={setConvenioAtivo}
            disabled={isLoading}
          />

          {/* Especialidades */}
          <CustomDropdown
            title={"Especialidades"}
            list={especialidades}
            state={especialidadeAtiva}
            setState={setEspecialidadeAtiva}
            disabled={!convenioAtivo}
          />

          {/* Locais */}
          <CustomDropdown
            title={"Locais"}
            list={locais}
            state={localAtivo}
            setState={setLocalAtivo}
            disabled={!convenioAtivo}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => SubmitAuthorization()}>
          Emitir
        </Button>
        <Button variant="secondary" onClick={() => HandleClose()}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
