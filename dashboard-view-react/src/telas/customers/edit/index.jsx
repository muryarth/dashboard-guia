import React, { useEffect, useState } from "react";

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

export default function CustomersEdit() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();
  const [currentUserData, setCurrentUserData] = useState();
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

  // Atualiza o registro do usuário
  const SubmitFormData = async () => {
    const body = {};

    // Valida se algum campo é diferente
    if (nome !== currentUserData.nome) body.nome = nome;
    if (sobrenome !== currentUserData.sobrenome) body.sobrenome = sobrenome;
    if (dataNascimento !== currentUserData.dataNascimento)
      body.dataNascimento = dataNascimento;
    if (genero !== currentUserData.dataNascimento) body.genero = genero;
    if (telefone !== currentUserData.telefone) body.telefone = telefone;
    if (email !== currentUserData.email) body.email = email;
    if (rg !== currentUserData.rg) body.rg = rg;
    if (cpf !== currentUserData.cpf) body.cpf = cpf;
    if (matricula !== currentUserData.matricula) body.matricula = matricula;
    if (
      cep !== currentUserData.endereco.cep ||
      endereco !== currentUserData.endereco.rua ||
      cidade !== currentUserData.endereco.cidade ||
      uf !== currentUserData.endereco.uf
    ) {
      body.endereco = {
        cep: cep,
        rua: endereco,
        cidade: cidade,
        uf: uf,
      };
    }
    if (detalhesCliente !== currentUserData.detalhesCliente)
      body.detalhesCliente = detalhesCliente;

    if (Object.keys(body).length !== 0) {
      const response = await RequestHTTP.UpdateItem(
        "/customers",
        currentUserId,
        body
      );

      if (response)
        setTimeout(() => {
          window.location.reload();
        }, 10);
    }
  };

  // Popula os dados de cada formulário
  const PopulateFormsData = (currentUserData) => {
    if (currentUserData) {
      setNome(currentUserData.nome);
      setSobrenome(currentUserData.sobrenome);
      setTelefone(currentUserData.telefone);
      setDataNascimento(currentUserData.dataNascimento);
      setGenero(currentUserData.genero);
      setEmail(currentUserData.email);
      setRG(currentUserData.rg);
      setCPF(currentUserData.cpf);
      setMatricula(currentUserData.matricula);
      setCEP(currentUserData.endereco.cep);
      setEndereco(currentUserData.endereco.rua);
      setUF(currentUserData.endereco.uf);
      setDetalhesCliente(currentUserData.detalhesCliente);
    }
  };

  const GetUserDataById = async (_id) => {
    if (_id !== undefined) {
      const response = await RequestHTTP.GetItemById("/customers", _id);
      setCurrentUserId(_id);
      setCurrentUserData(response);
    }
  };

  // Roda sempre que o componente é montado
  useEffect(() => {
    if (window.location.search) {
      const _id = window.location.search.split("?_id=")[1];
      GetUserDataById(_id);
    }
  }, []);

  // Roda sempre que currentUserId for atualizado
  useEffect(() => {
    if (currentUserData) PopulateFormsData(currentUserData);
  }, [currentUserData]);

  return (
    <Container fluid>
      <Form>
        <Row className="form-group mb-4">
          <Col>
            <DefaultAppFormField
              disabled={!isEditing}
              label={"Nome"}
              placeholder={"Insira o nome..."}
              state={nome}
              setState={setNome}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
          </Col>

          <Col className="align-items-center">
            <Form.Label>Gênero: </Form.Label>
            <DropdownButton
              variant="light"
              id="dropdown-basic-button"
              title={
                genero && (genero !== "") !== undefined ? genero : "Gênero"
              }
              disabled={!isEditing}
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
              disabled={!isEditing}
              label={"Telefone"}
              placeholder={"(00)90000-0000"}
              state={telefone}
              setState={setTelefone}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              disabled={!isEditing}
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
              disabled={!isEditing}
              label={"RG"}
              placeholder={"00.000.000-0"}
              state={rg}
              setState={setRG}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              disabled={!isEditing}
              label={"CPF"}
              placeholder={"000.000.000-00"}
              state={cpf}
              setState={setCPF}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              disabled={!isEditing}
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
              disabled={!isEditing}
              label={"CEP"}
              placeholder={"00000-000"}
              state={cep}
              setState={setCEP}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              disabled={!isEditing}
              label={"Endereco"}
              placeholder={"Rua Exemplo, n° 100"}
              state={endereco}
              setState={setEndereco}
              required={true}
            />
          </Col>

          <Col>
            <DefaultAppFormField
              disabled={!isEditing}
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
              disabled={!isEditing}
              label={"Detalhes do cliente"}
              placeholder={""}
              state={detalhesCliente}
              setState={setDetalhesCliente}
              required={false}
              as={"textarea"}
            />
          </Col>
        </Row>

        {!isEditing ? (
          <Button
            className="ms-2"
            variant="primary"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </Button>
        ) : (
          <>
            <Button
              className="ms-2"
              variant="primary"
              onClick={() => SubmitFormData()}
            >
              Salvar
            </Button>
            <Button
              className="ms-2"
              variant="primary"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
          </>
        )}
        <Form.Group className="mb-4"></Form.Group>
      </Form>
    </Container>
  );
}
