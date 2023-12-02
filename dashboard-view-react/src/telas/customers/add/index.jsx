import React, { useState } from "react";

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can use formData to send the data to the server
    console.log("Form Data:", formData);
  };

  return (
    <div className="container-fluid">
      {/* ... (previous code) */}
      <form action="/add" method="POST" onSubmit={handleSubmit}>
        <div className="row form-group mb-4">
          <div className="col">
            <label htmlFor="nomePrimeiro">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nomePrimeiro"
              value={formData.nomePrimeiro}
              placeholder="Nome"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col">
            <label htmlFor="sobreNome">Sobrenome</label>
            <input
              type="text"
              className="form-control"
              id="sobrenome"
              name="sobreNome"
              value={formData.sobreNome}
              placeholder="Sobrenome"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row form-group mb-4">
          <div className="col">
            <label htmlFor="tel">Contato</label>
            <input
              type="text"
              className="form-control"
              id="tel"
              name="tel"
              value={formData.tel}
              placeholder="(00) 00000-0000"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              placeholder="nome@exemplo.com"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row form-group mb-4">
          <div className="col">
            <label htmlFor="rg">RG</label>
            <input
              type="text"
              className="form-control"
              id="rg"
              name="rg"
              value={formData.rg}
              placeholder="00.000.000-0"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              className="form-control"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              placeholder="000.000.000-00"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="matricula">Matrícula</label>
            <input
              type="text"
              className="form-control"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              placeholder="000000"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row form-group mb-4">
          <div className="col">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              className="form-control"
              id="cep"
              name="cep"
              value={formData.cep}
              placeholder="00000-00"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              className="form-control"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              placeholder="Rua Exemplo, n° 100"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="uf">UF</label>
            <input
              type="text"
              className="form-control"
              id="uf"
              name="uf"
              value={formData.uf}
              placeholder="RJ"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="details">Detalhes do Cliente</label>
          <textarea
            className="form-control"
            name="details"
            id="details"
            cols="30"
            rows="10"
            value={formData.details}
            placeholder="Detalhes do Cliente"
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <button type="submit" className="btn btn-primary">
            Adicionar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}
