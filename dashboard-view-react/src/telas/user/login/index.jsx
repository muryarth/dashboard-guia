import React, { useState } from "react";

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

  const CreateLocalStorage = ({ user, token }) => {
    const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutos a partir do momento atual

    localStorage.setItem("token", token);
    localStorage.setItem("user", user.nome);
    localStorage.setItem("email", user.email);
    localStorage.setItem("tokenExpiration", expirationTime.toString());
  };

  const AuthenticateUser = async () => {
    if (login !== "" && password !== "") {
      let user = {
        login: login,
        senha: password,
      };

      const response = await RequestHTTP.ValidateUser(user);
      console.log(response);
      if (response.token) {
        CreateLocalStorage({ user: response.user, token: response.token });
        window.location.href = "/customers";
      }
    }
  };

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
            type="password"
          />

          <Button
            variant="primary"
            type="button"
            style={{ width: "100%" }}
            onClick={() => AuthenticateUser()}
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
