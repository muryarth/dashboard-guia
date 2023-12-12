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
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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
            label={"Login"}
            placeholder={"Insira o login..."}
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
            mb="mb-3"
          />

          <Button
            variant="primary"
            type="button"
            style={{ width: "100%" }}
          >
            Entrar
          </Button>

          <div className="mt-2 text-center">
            <span style={{ marginRight: "10px" }}>ou</span>
            <Button variant="secondary" type="button" href="/user/register">
              Cadastrar-se
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
