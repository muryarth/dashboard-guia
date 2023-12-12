import React, { useState, useEffect } from "react";

//Bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Componente da App
import DefaultAppFormField from "../../../components/DefaultAppFormField";

// services.js
import RequestHTTP from "../../../services/services.js";

export default function UserLogin() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          width: "450px",
          minWidth: "250px",
        }}
      >
        <Form>
          <DefaultAppFormField
            label={"Nome"}
            placeholder={"Insira o nome..."}
            state={name}
            setState={setName}
            required={true}
            mb="mb-2"
          />
          <DefaultAppFormField
            label={"Sobrenome"}
            placeholder={"Insira o sobrenome..."}
            state={lastname}
            setState={setLastname}
            required={true}
            mb="mb-2"
          />
          <DefaultAppFormField
            label={"Email"}
            placeholder={"Insira a email..."}
            state={email}
            setState={setEmail}
            required={true}
            mb="mb-2"
          />
          <DefaultAppFormField
            label={"Nome de usuário"}
            placeholder={"Insira o nome de usuário..."}
            state={login}
            setState={setLogin}
            required={true}
            mb="mb-2"
          />
          <DefaultAppFormField
            label={"Senha"}
            placeholder={"Insira a senha..."}
            state={password}
            setState={setPassword}
            required={true}
            mb="mb-2"
          />
          <DefaultAppFormField
            label={"Confirmar senha"}
            placeholder={"Insira a senha..."}
            state={passwordConfirmation}
            setState={setPasswordConfirmation}
            required={true}
            mb="mb-3"
          />

          <div className="d-flex justify-content-between">
            <Button
              variant="primary"
              type="button"
              style={{ width: "48%" }}
            >
              Cadastrar
            </Button>

            <Button
              variant="secondary"
              type="button"
              href="/user/login"
              style={{ width: "48%" }}
            >
              Voltar
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
