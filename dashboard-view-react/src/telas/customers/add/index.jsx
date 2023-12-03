import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function AddCustomer() {
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

  const CampoForm = (label, placeholder, nome, set) => {
    return (
      <>
        <label>{`${label}:`}</label>
        <input
          type="text"
          className="form-control"
          name={`${nome}`}
          value={nome}
          placeholder={placeholder}
          onChange={(event) => set(event.target.value)}
          required
        />
      </>
    );
  };

  const SendPOSTRequest = () => {
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

    console.log(body);
  };

  return (
    <Container fluid>
      <Form>
        <Row className="form-group mb-4">
          <Col>{CampoForm("Nome", "Insira o nome...", nome, setNome)}</Col>

          <Col>
            {CampoForm(
              "Sobrenome",
              "Insira o sobrenome...",
              sobrenome,
              setSobrenome
            )}
          </Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>
            {CampoForm("Telefone", "(00)90000-0000", telefone, setTelefone)}
          </Col>

          <Col>
            {CampoForm("Email", "exemplo@exemplo.com", email, setEmail)}
          </Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>{CampoForm("RG", "00.000.000-0", rg, setRG)}</Col>

          <Col>{CampoForm("CPF", "000.000.000-00", cpf, setCPF)}</Col>

          <Col>{CampoForm("Matrícula", "000000", matricula, setMatricula)}</Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>{CampoForm("CEP", "00000-000", cep, setCEP)}</Col>

          <Col>
            {CampoForm(
              "Endereco",
              "Rua Exemplo, n° 100",
              endereco,
              setEndereco
            )}
          </Col>

          <Col>{CampoForm("UF", "Rio de Janeiro", uf, setUF)}</Col>
        </Row>

        <Form.Group className="mb-4">
          {CampoForm(
            "Detalhes do cliente",
            "",
            detalhesCliente,
            setDetalhesCliente
          )}
        </Form.Group>

        <Form.Group className="mb-4">
          <Button
            // type="submit"
            variant="primary"
            onClick={() => SendPOSTRequest()}
          >
            Adicionar Cliente
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
