import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Dropdown } from "react-bootstrap";
import RequestHTTP from "../../../../../services/services";

const CustomDropdown = ({ list, state, setState, title = "Title" }) => {
  return (
    <Dropdown>
      {/* Parte do título */}
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100">
        {state ? state.nome || state.especialidade : title}
      </Dropdown.Toggle>

      {/* Parte do menu */}
      <Dropdown.Menu
        style={{ maxHeight: "200px", overflowY: "auto" }}
        className="w-100"
      >
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
  handleClose,
  currentUserId = "",
  currentUserName = "",
}) {
  const [convenios, setConvenios] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [locais, setLocais] = useState([]);
  const [convenioAtivo, setConvenioAtivo] = useState(null);
  const [especialidadeAtiva, setEspecialidadeAtiva] = useState(null);
  const [localAtivo, setLocalAtivo] = useState(null);

  const GetAgreements = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/agreements", "1000");
    setConvenios(data);
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

    if (Object.keys(body).length !== 0 && Object.keys(body).length === 6) {
      const response = await RequestHTTP.AddItem("/authorizations", body);
      console.log(response);
      // if (response)
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 10);
    }
  };

  useEffect(() => {
    GetAgreements();
  }, []);

  useEffect(() => {
    if (convenioAtivo !== undefined && convenioAtivo !== null)
      GetAllDropdownData(convenioAtivo._id);
  }, [convenioAtivo]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {currentUserName // Se não houver um nome, trata a label da forma correta
            ? `Emitir guia para ${currentUserName}:`
            : "Emitir guia:"}
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
          />

          {/* Especialidades */}
          <CustomDropdown
            title={"Especialidades"}
            list={especialidades}
            state={especialidadeAtiva}
            setState={setEspecialidadeAtiva}
          />

          {/* Locais */}
          <CustomDropdown
            title={"Locais"}
            list={locais}
            state={localAtivo}
            setState={setLocalAtivo}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => SubmitAuthorization()}>
          Emitir
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
