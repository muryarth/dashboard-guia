import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DefaultAppFormField from "../../../components/DefaultAppFormField";
import RequestHTTP from "../../../services/services";

export default function CustomersAdd() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [rg, setRG] = useState("");
  const [cpf, setCPF] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cep, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [uf, setUF] = useState("");
  const [detalhesCliente, setDetalhesCliente] = useState("");

  const SubmitFormData = () => {
    const body = {};

    body.nome = nome;
    body.sobrenome = sobrenome;
    body.telefone = telefone;
    body.email = email;
    body.rg = rg;
    body.cpf = cpf;
    body.matricula = matricula;
    body.cep = cep;
    body.endereco = endereco;
    body.uf = uf;
    body.detalhesCliente = detalhesCliente;

    if ((nome !== "", sobrenome !== "", telefone !== "", email !== "")) {
      RequestHTTP.AddItem("/customers", body);
      console.log(body);
      // window.location.reload();
    }
  };

  return (
    <Container fluid>
      <Form>
        <Row className="form-group mb-4">
          <Col>
            <DefaultAppFormField
              label={"Nome"}
              placeholder={"Insira o nome..."}
              state={nome}
              setState={setNome}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              label={"Sobrenome"}
              placeholder={"Insira o sobrenome..."}
              state={sobrenome}
              setState={setSobrenome}
              required={true}
            />
          </Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>
            <DefaultAppFormField
              label={"Telefone"}
              placeholder={"(00)90000-0000"}
              state={telefone}
              setState={setTelefone}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              label={"Email"}
              placeholder={"exemplo@exemplo.com"}
              state={email}
              setState={setEmail}
              required={true}
            />
          </Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>
            <DefaultAppFormField
              label={"RG"}
              placeholder={"00.000.000-0"}
              state={rg}
              setState={setRG}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              label={"CPF"}
              placeholder={"000.000.000-00"}
              state={cpf}
              setState={setCPF}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              label={"Matrícula"}
              placeholder={"000000"}
              state={matricula}
              setState={setMatricula}
              required={true}
            />
          </Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>
            <DefaultAppFormField
              label={"CEP"}
              placeholder={"00000-000"}
              state={cep}
              setState={setCEP}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              label={"Endereco"}
              placeholder={"Rua Exemplo, n° 100"}
              state={endereco}
              setState={setEndereco}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              label={"UF"}
              placeholder={"Rio de Janeiro"}
              state={uf}
              setState={setUF}
              required={true}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <DefaultAppFormField
              label={"Detalhes do cliente"}
              placeholder={""}
              state={detalhesCliente}
              setState={setDetalhesCliente}
              required={false}
              as={"textarea"}
            />
          </Col>
        </Row>
        <Form.Group className="mb-4"></Form.Group>

        <Button variant="primary" onClick={() => SubmitFormData()}>
          Adicionar Cliente
        </Button>
      </Form>
    </Container>
  );
}
