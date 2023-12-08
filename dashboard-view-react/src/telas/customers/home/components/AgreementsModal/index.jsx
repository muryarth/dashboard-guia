import { Row, Col, Button, Modal, Dropdown, Spinner } from "react-bootstrap";

export default function AgreementsModal({
  showModal,
  handleClose,
  currentUserName,
  // currentUserId,
  agreements = [],
  // dropdownOptions = [],
  // setDropdownOptions = [],
}) {
  return (
    <Modal
      show={showModal}
      onHide={() => handleClose(false)}
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
                <Col className="d-flex align-items-center justify-content-end">
                  <p className="mb-0">{convenio.nome}</p>
                </Col>
                <Col className="text-start">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Ativo
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {}}>Ativo</Dropdown.Item>
                      <Dropdown.Item onClick={() => {}}>Inativo</Dropdown.Item>
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
        <Button variant="primary" onClick={() => console.log(agreements)}>
          Ok
        </Button>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
