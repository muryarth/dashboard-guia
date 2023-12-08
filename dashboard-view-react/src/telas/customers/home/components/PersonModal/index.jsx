import { Container, Row, Col, Button, Modal, Dropdown } from "react-bootstrap";

export default function ModalPessoaConvenio({
  showModal,
  handleClose,
  currentUserName,
  currentUserId,
  dataList = [],
  dropdownOptions = [],
  setDropdownOptions = [],
}) {
  return (
    <Modal show={showModal} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Emitir guia para {currentUserName}:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {dataList.length > 0 &&
            dataList.map((convenio) => {
              return (
                <>
                  <Row>
                    <Col>
                      <p className="text-center">{convenio.nome}</p>
                    </Col>
                    <Col>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Ativo
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => {}}>
                            Ativo
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {}}>
                            Inativo
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </>
              );
            })}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => console.log(dataList)}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
