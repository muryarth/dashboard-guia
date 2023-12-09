import { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Dropdown, Spinner } from "react-bootstrap";

// Services
import RequestHTTP from "../../../../../services/services";

export default function AgreementsModal({
  showModal,
  setShowModal,
  currentUserName,
  currentUserId,
}) {
  const [agreements, setAgreements] = useState([]);
  const [userActiveAgreements, setUserActiveAgreements] = useState([]);

  const HandleClose = () => {
    setShowModal(false);
    setAgreements([]);
  };

  const UpdateUserActiveAgreements = async () => {
    const body = { conveniosAtivos: userActiveAgreements };
    await RequestHTTP.UpdateItem("/customers", currentUserId, body);
  };

  const RemoveUserAgreement = async (currentAgreement) => {
    const agreements = [...userActiveAgreements];
    if (agreements.find((_id) => _id === currentAgreement._id)) {
      const indexOfRemoval = agreements.indexOf(currentAgreement._id);
      agreements.splice(indexOfRemoval, 1);
    }
    setUserActiveAgreements(agreements);
  };

  const AddUserAgreements = async (currentAgreement) => {
    if (!userActiveAgreements.find((_id) => _id === currentAgreement._id))
      setUserActiveAgreements([...userActiveAgreements, currentAgreement._id]);
  };

  const GetAllAgreements = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/agreements");
    setAgreements(data);
  };

  const GetCurrentUserActiveAgreements = async () => {
    const response = await RequestHTTP.GetItemById(
      "/customers",
      `${currentUserId}`
    );

    if (response.conveniosAtivos) {
      setUserActiveAgreements(response.conveniosAtivos);
    }
  };

  useEffect(() => {
    if (showModal) {
      GetAllAgreements();
      GetCurrentUserActiveAgreements();
    }
  }, [showModal]);

  return (
    <Modal
      show={showModal}
      onHide={() => HandleClose()}
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {currentUserName // Se não houver um nome, trata a label da forma correta
            ? `Convênios ativos de ${currentUserName}:`
            : "Convênios:"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "40vh", overflowY: "auto" }}>
        {agreements.length > 0 ? (
          agreements.map((convenio) => {
            return (
              <Row key={`${convenio._id}`} className="mb-2 mt-2">
                {/* Label com nome do convênio, ao lado do dropdown */}
                <Col className="d-flex align-items-center justify-content-end">
                  <p className="mb-0">{convenio.nome}</p>
                </Col>

                <Col className="text-start">
                  <Dropdown>
                    {/* Renderiza o item de acordo com o status de cada convênio */}

                    {userActiveAgreements.find(
                      (_id) => _id === convenio._id
                    ) ? (
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        Ativo
                      </Dropdown.Toggle>
                    ) : (
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Inativo
                      </Dropdown.Toggle>
                    )}

                    {/* Opções */}
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => AddUserAgreements(convenio)}
                      >
                        Ativo
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => RemoveUserAgreement(convenio)}
                      >
                        Inativo
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            );
          })
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            UpdateUserActiveAgreements();
            HandleClose();
          }}
        >
          Salvar
        </Button>
        <Button variant="secondary" onClick={() => HandleClose()}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
