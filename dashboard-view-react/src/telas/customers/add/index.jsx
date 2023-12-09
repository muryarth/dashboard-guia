import React, { useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Componentes da App
import DefaultAppFormField from "../../../components/DefaultAppFormField";
import RequestHTTP from "../../../services/services";

export default function CustomersAdd() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [rg, setRG] = useState("");
  const [cpf, setCPF] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cep, setCEP] = useState("");
  const [endereco, setEndereco] = useState(""); // Rua
  const [cidade, setCidade] = useState("");
  const [uf, setUF] = useState("");
  const [detalhesCliente, setDetalhesCliente] = useState("");

  const SubmitFormData = async () => {
    const body = {};

    console.log(cep);

    body.nome = nome || "";
    body.sobrenome = sobrenome || "";
    body.dataNascimento = dataNascimento || "";
    body.genero = genero || "";
    body.telefone = telefone || "";
    body.email = email || "";
    body.rg = rg || "";
    body.cpf = cpf || "";
    body.matricula = matricula || "";
    body.endereco = {
      cep: cep || "",
      rua: endereco || "",
      uf: uf || "",
      cidade: cidade || "",
    };
    body.detalhesCliente = detalhesCliente || "";
    body.conveniosAtivos = [];

    if (
      Object.keys(body).length !== 0 &&
      nome !== "" &&
      sobrenome !== "" &&
      telefone !== "" &&
      email !== ""
    ) {
      await RequestHTTP.AddItem("/customers", body);
      window.location.href = "/customers";
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

          <Col>
            <DefaultAppFormField
              label={"Data de nascimento"}
              placeholder={"dd/mm/aaaa"}
              state={dataNascimento}
              setState={setDataNascimento}
            />
          </Col>

          <Col className="d-flex align-items-center mt-2">
            <DropdownButton
              variant="light"
              id="dropdown-basic-button"
              title={genero !== "" ? genero : "Gênero"}
            >
              <Dropdown.Item onClick={() => setGenero("")}>
                Nenhum
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGenero("Masculino")}>
                Masculino
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGenero("Feminino")}>
                Feminino
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGenero("Outro")}>
                Outro
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGenero("Prefere não responder")}>
                Prefere não responder
              </Dropdown.Item>
            </DropdownButton>
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
