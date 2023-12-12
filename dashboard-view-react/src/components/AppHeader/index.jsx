import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function HeaderNavbar({ items = [] }) {
  const HandleLogout = () => {
    localStorage.clear();
    window.location.href = "/user/login";
  };

  return (
    <Navbar
      className="p-2"
      collapseOnSelect
      expand="lg"
      variant="dark"
      sticky="top"
      style={{ backgroundColor: "#343434" }}
    >
      {/* Título */}
      <Navbar.Brand className="ms-3" href="/">
        Sistema para gerenciamento de Convênios e Emissão de Guias Autorizadas
      </Navbar.Brand>

      {/* Cria o header de acordo com os valores recebidos pela prop, dinâmicamente */}
      <Navbar.Collapse>
        {items.length > 0 && (
          <Nav className="me-auto my-2 my-lg-0">
            {items.map((item) => {
              return (
                <Nav.Link className="active" key={item.name} href={item.link}>
                  {item.name}
                </Nav.Link>
              );
            })}
          </Nav>
        )}

        {/* Texto de boas-vindas no lado direito com a cor branca */}
        <span className="ms-auto text-light">
          {localStorage.getItem("user")
            ? `Olá, ${localStorage.getItem("user")}`
            : ""}
        </span>

        <button
          className="ms-2 btn btn-outline-danger btn-sm"
          onClick={() => HandleLogout()}
        >
          Logout
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
}
