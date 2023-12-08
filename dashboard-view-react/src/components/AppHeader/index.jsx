import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function HeaderNavbar({ items = [] }) {
  return (
    <Navbar
      className="p-2"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
    >
      {/* Título */}
      <Navbar.Brand className="ms-3" href="/">
        Sistema para gerenciamento de Convênios e Emissão de Guias Autorizadas
      </Navbar.Brand>

      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}

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
      </Navbar.Collapse>
    </Navbar>
  );
}
