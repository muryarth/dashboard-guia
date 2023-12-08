import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import RequestHTTP from "../../services/services";

export default function DeleteConfirmationModal({
  showModal,
  handleClose,
  deleteName,
  deleteId,
  deleteRoute,
  title = "Confirmação",
  message = `Tem certeza que deseja deletar ${deleteName}?`,
}) {
  const DeleteSelectedItem = async (route, _id) => {
    await RequestHTTP.DeleteItemById(route, _id);
    window.location.reload();
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => DeleteSelectedItem(deleteRoute, deleteId)}
        >
          Deletar
        </Button>
        <Button variant="secondary" onClick={() => handleClose()}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
