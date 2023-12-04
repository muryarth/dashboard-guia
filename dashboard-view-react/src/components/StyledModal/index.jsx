import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Dropdown } from "react-bootstrap";
import RequestHTTP from "../../services/services";

const StyledModal = ({
  showModal,
  handleClose,
  currentUserId = "",
  currentUserName = "",
}) => {
  const [convenios, setConvenios] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [locais, setLocais] = useState([]);
  const [convenioAtivo, setConvenioAtivo] = useState();
  const [especialidadeAtiva, setEspecialidadeAtiva] = useState();
  const [localAtivo, setLocalAtivo] = useState();

  const GetAgreements = async () => {
    const data = await RequestHTTP.GetAllItems("/agreements");
    setConvenios(data);
  };

  const GetAllDropdownData = async (id) => {
    const dadosConvenio = await RequestHTTP.GetItemById("/agreements", id);
    setEspecialidades(dadosConvenio.especialidades);
    setLocais(dadosConvenio.locais);
  };

  const SendAuthorizationData = () => {
    const body = {};

    body.cliente = currentUserId;
    body.preco = 70;
    body.convenio = convenioAtivo;
    body.especialidade = especialidadeAtiva;
    body.local = localAtivo;
    body.criadoPor = "656cb3af8d7c85e024a6a892";

    if (convenioAtivo || especialidadeAtiva || localAtivo) {
      RequestHTTP.AddItem("/authorizations", body);
      window.location.reload();
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
        <Modal.Title>Emitir guia para {currentUserName}:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <div className="d-flex justify-content-between">
            <Dropdown>
              {/* Convênios */}
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {convenioAtivo ? convenioAtivo.nome : "Convênio"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item key={"0"} onClick={() => setConvenioAtivo(null)}>
                  {"Nenhum"}
                </Dropdown.Item>
                {convenios.length > 0 &&
                  convenios.map((convenio) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          setConvenioAtivo({
                            _id: convenio._id,
                            nome: convenio.nome,
                          });
                        }}
                        key={convenio._id}
                      >
                        {convenio.nome}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>

            {/* Especialidades */}
            <Dropdown disabled>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {especialidadeAtiva ? especialidadeAtiva.nome : "Especialidade"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  key={"0"}
                  onClick={() => setEspecialidadeAtiva(null)}
                >
                  {"Nenhum"}
                </Dropdown.Item>
                {convenioAtivo !== null &&
                  especialidades.length > 0 &&
                  especialidades.map((especialidade) => {
                    return (
                      <Dropdown.Item
                        key={especialidade._id}
                        onClick={() => {
                          setEspecialidadeAtiva({
                            _id: especialidade._id,
                            nome: especialidade.especialidade,
                          });
                        }}
                      >
                        {especialidade.especialidade}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>

            {/* Locais */}
            <Dropdown disabled>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {localAtivo ? localAtivo.nome : "Local"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item key={"0"} onClick={() => setLocalAtivo(null)}>
                  {"Nenhum"}
                </Dropdown.Item>
                {convenioAtivo !== null &&
                  locais.length > 0 &&
                  locais.map((local) => {
                    return (
                      <Dropdown.Item
                        key={local._id}
                        onClick={() => {
                          setLocalAtivo({
                            _id: local._id,
                            nome: local.nome,
                          });
                        }}
                      >
                        {local.nome}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => SendAuthorizationData()}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StyledModal;
