import React, { useState } from "react";

// Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// Componentes da app
import DefaultAppFormField from "../../../../../components/DefaultAppFormField";

// services.js
import RequestHTTP from "../../../../../services/services";

export default function AddItemModal({
  route,
  showModal,
  setShowModal,
  label = "Local",
  title = "Criar novo",
}) {
  const [text, setText] = useState();

  const HandleClose = () => {
    setText("");
    setShowModal(false);
  };

  const AddNewItem = async (route, _id) => {
    const body = {};

    if (label === "Especialidade") {
      body.especialidade = text;
    } else if (label === "Local") {
      body.nome = text;
      body.endereco = {
        uf: "RJ",
        cidade: "Petrópolis",
        rua: "Rua A",
      };
    }

    console.log(body);

    const response = await RequestHTTP.AddItem(route, body);
    if (response) window.location.reload();
  };

  return (
    <Modal
      show={showModal}
      onHide={() => HandleClose()}
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <DefaultAppFormField
            label={label}
            placeholder={"Informe o nome..."}
            state={text}
            setState={setText}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => AddNewItem(route)}>
          Adicionar
        </Button>
        <Button variant="secondary" onClick={() => HandleClose()}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
